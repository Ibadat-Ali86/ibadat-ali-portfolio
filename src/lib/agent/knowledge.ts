// WHAT: In-memory knowledge loader and chunking engine for the portfolio corpus.
// WHY : Loads raw JSON data files, enforces privacy and claim boundaries, and segments
//       documents into focused KnowledgeChunks for MiniSearch retrieval.
// TRADEOFF: Loads and caches data in server memory rather than querying a database;
//           optimal for the bounded portfolio corpus and ensures zero external I/O costs.

import * as fs from "fs"
import * as path from "path"
import type { EntityType, KnowledgeChunk } from "./types"

let cachedChunks: KnowledgeChunk[] | null = null

/**
 * Resolves the absolute path to the portfolio data directory.
 * Tolerates execution from workspace root or nested Next.js builds.
 */
function getPortfolioDataDir(): string {
  let curr = process.cwd()
  for (let i = 0; i < 5; i++) {
    const candidate1 = path.join(curr, "src/data/portfolio")
    if (fs.existsSync(candidate1) && fs.existsSync(path.join(candidate1, "profile.json"))) {
      return candidate1
    }
    const candidate2 = path.join(curr, "data/portfolio")
    if (fs.existsSync(candidate2) && fs.existsSync(path.join(candidate2, "profile.json"))) {
      return candidate2
    }
    const parent = path.dirname(curr)
    if (parent === curr) break
    curr = parent
  }

  curr = __dirname
  for (let i = 0; i < 5; i++) {
    const candidate1 = path.join(curr, "data/portfolio")
    if (fs.existsSync(candidate1) && fs.existsSync(path.join(candidate1, "profile.json"))) {
      return candidate1
    }
    const candidate2 = path.join(curr, "src/data/portfolio")
    if (fs.existsSync(candidate2) && fs.existsSync(path.join(candidate2, "profile.json"))) {
      return candidate2
    }
    const parent = path.dirname(curr)
    if (parent === curr) break
    curr = parent
  }

  return path.join(process.cwd(), "src/data/portfolio")
}

function safeReadJson<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Failed to read JSON file at ${filePath}:`, error)
    return null
  }
}

function createChunk(params: {
  id: string
  entityId: string
  entityType: EntityType
  section: string
  title: string
  text: string
  keywords?: string[]
  technologies?: string[]
  category?: string[]
  domain?: string[]
  sourceUrl?: string | null
}): KnowledgeChunk {
  const keywords = params.keywords || []
  const technologies = params.technologies || []
  const category = params.category || []

  return {
    id: params.id,
    entityId: params.entityId,
    entityType: params.entityType,
    section: params.section,
    title: params.title,
    text: params.text,
    content: params.text,
    keywords,
    tags: keywords,
    technologies,
    category,
    domain: params.domain,
    sourceUrl: params.sourceUrl ?? null,
    keywordsText: keywords.join(" "),
    technologiesText: technologies.join(" "),
    categoryText: category.join(" ")
  }
}

/**
 * Parses all portfolio JSON files into granular KnowledgeChunks.
 */
export function loadAllChunks(): KnowledgeChunk[] {
  if (cachedChunks) {
    return cachedChunks
  }

  const baseDir = getPortfolioDataDir()
  const chunks: KnowledgeChunk[] = []

  // 1. Profile Chunks
  const profile = safeReadJson<any>(path.join(baseDir, "profile.json"))
  if (profile) {
    // Profile Overview
    chunks.push(
      createChunk({
        id: "profile-overview",
        entityId: "profile",
        entityType: "profile",
        section: "overview",
        title: `${profile.name} - ${profile.headline}`,
        text: `Name: ${profile.name}. Headline: ${profile.headline}. Location: ${profile.location?.base}, Availability: ${profile.location?.availability}. Summary: ${profile.professionalSummary}`,
        keywords: [profile.name, "overview", "bio", "about", ...(profile.preferredIdentity || [])],
        category: ["Profile", "About"],
        sourceUrl: "https://ibadat-ali-portfolio.vercel.app/"
      })
    )

    // Profile Positioning & Principles
    if (profile.positioning) {
      const principles = (profile.positioning.workingPrinciples || []).join(" ")
      const strengths = (profile.positioning.strengths || []).join(", ")
      chunks.push(
        createChunk({
          id: "profile-positioning",
          entityId: "profile",
          entityType: "profile",
          section: "positioning",
          title: `${profile.name} - Working Principles & Strengths`,
          text: `Primary focus: ${profile.positioning.primary} Strengths: ${strengths} Working Principles: ${principles}`,
          keywords: ["principles", "strengths", "methodology", "approach"],
          category: ["Profile", "Strategy"]
        })
      )
    }

    // Services
    if (Array.isArray(profile.services)) {
      for (const service of profile.services) {
        chunks.push(
          createChunk({
            id: `service-${service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
            entityId: "profile",
            entityType: "profile",
            section: "service",
            title: `Service: ${service.name}`,
            text: `Service Name: ${service.name}. Description: ${service.description}. Representative Projects: ${(service.representativeProjects || []).join(", ")}.`,
            keywords: ["service", "offering", service.name, ...(service.representativeProjects || [])],
            category: ["Services", "Offerings"]
          })
        )
      }
    }

    // Contact & Social Media Information
    if (profile.contact) {
      chunks.push(
        createChunk({
          id: "profile-contact",
          entityId: "contact",
          entityType: "profile",
          section: "contact",
          title: `${profile.name} - Official Contact Details & Social Media Links`,
          text: `Contact details for ${profile.name}: Email: [${profile.contact.email}](mailto:${profile.contact.email}). WhatsApp: [${profile.contact.whatsapp}](https://wa.me/923220692321). LinkedIn: [LinkedIn Profile](${profile.contact.linkedinUrl}). GitHub: [GitHub Profile](${profile.contact.githubUrl}). Portfolio: [Portfolio Website](${profile.contact.portfolioUrl}). Kaggle: [Kaggle Profile](${profile.contact.kaggleUrl}). Resume: [Verified Resume](${profile.contact.resumeUrl}). Project Inquiry Guidance: ${profile.contact.projectInquiryGuidance || ""}`,
          keywords: [
            "contact",
            "email",
            "linkedin",
            "github",
            "whatsapp",
            "kaggle",
            "social media",
            "hire",
            "reach out",
            "phone",
            "connect",
            profile.contact.email,
            profile.name
          ],
          category: ["Profile", "Contact"],
          sourceUrl: profile.contact.portfolioUrl
        })
      )
    }
  }

  // 2. Skills Chunks
  const skills = safeReadJson<any>(path.join(baseDir, "skills.json"))
  if (skills && Array.isArray(skills.capabilityAreas)) {
    for (const cap of skills.capabilityAreas) {
      chunks.push(
        createChunk({
          id: `skill-${cap.id}`,
          entityId: cap.id,
          entityType: "skill",
          section: "capability",
          title: `Capability: ${cap.name}`,
          text: `Capability Area: ${cap.name}. Description: ${cap.description}. Technologies: ${(cap.technologies || []).join(", ")}. Evidence Projects: ${(cap.evidenceProjects || []).join(", ")}.`,
          keywords: [cap.name, ...(cap.technologies || []), ...(cap.evidenceProjects || [])],
          technologies: cap.technologies || [],
          category: ["Skills", "Capabilities"]
        })
      )
    }

    if (Array.isArray(skills.technologyInventory)) {
      chunks.push(
        createChunk({
          id: "skills-tech-inventory",
          entityId: "skills-inventory",
          entityType: "skill",
          section: "inventory",
          title: "Complete Technology Stack & Tools Inventory",
          text: `Full technology inventory and tools used across portfolio projects: ${skills.technologyInventory.join(", ")}.`,
          keywords: ["technologies", "tech stack", "tools", "libraries", ...skills.technologyInventory],
          technologies: skills.technologyInventory,
          category: ["Skills", "Stack"]
        })
      )
    }
  }

  // 3. Experience Chunks
  const experience = safeReadJson<any>(path.join(baseDir, "experience.json"))
  if (experience && Array.isArray(experience.roles)) {
    for (const role of experience.roles) {
      const allowed = (role.allowedClaims || []).join(" ")
      const restricted = (role.restrictedClaims || []).join(" ")
      const caps = (role.capabilities || []).join(", ")
      chunks.push(
        createChunk({
          id: `experience-${role.id}`,
          entityId: role.id,
          entityType: "experience",
          section: "role",
          title: `Experience: ${role.title} at ${role.organization}`,
          text: `Role: ${role.title} at ${role.organization} (${role.period?.start || ""} to ${role.period?.end || ""}). Employment Type: ${role.employmentType}, Work Mode: ${role.workMode}. Description: ${role.description}. Capabilities: ${caps}. Allowed Claims: ${allowed}. Boundaries/Restrictions: ${restricted}`,
          keywords: [role.title, role.organization, "experience", "role", "work", ...(role.capabilities || [])],
          category: ["Experience", "Career"]
        })
      )
    }
  }

  // 4. Certifications Chunks
  const certs = safeReadJson<any>(path.join(baseDir, "certifications.json"))
  if (certs && Array.isArray(certs.certifications)) {
    for (const cert of certs.certifications) {
      chunks.push(
        createChunk({
          id: `cert-${cert.id}`,
          entityId: cert.id,
          entityType: "credential",
          section: "certification",
          title: `Certification: ${cert.title} by ${cert.issuer}`,
          text: `Credential: ${cert.title} issued by ${cert.issuer} (${cert.issued}). Verification: ${cert.verificationStatus}. Allowed claims: ${(cert.allowedClaims || []).join(" ")}. Restrictions: ${(cert.restrictedClaims || []).join(" ")}`,
          keywords: [cert.title, cert.issuer, "certification", "credential", "certificate"],
          category: ["Certifications", "Credentials"],
          sourceUrl: cert.credentialUrl
        })
      )
    }
  }

  // 5. FAQ Chunks
  const faqData = safeReadJson<any>(path.join(baseDir, "faq.json"))
  if (faqData && Array.isArray(faqData.faqs)) {
    for (const item of faqData.faqs) {
      const questionsStr = (item.questions || []).join(" | ")
      chunks.push(
        createChunk({
          id: `faq-${item.id}`,
          entityId: item.id,
          entityType: "faq",
          section: "qa",
          title: `FAQ: ${item.questions?.[0] || item.id}`,
          text: `Questions: ${questionsStr}. Answer: ${item.answer}. Suggested follow-ups: ${(item.suggestedFollowUps || []).join(", ")}.`,
          keywords: ["faq", "q&a", ...(item.questions || []), ...(item.evidenceTargets || [])],
          category: ["FAQ"]
        })
      )
    }
  }

  // 6. Detailed Project Chunks
  const projectsDir = path.join(baseDir, "projects")
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir).filter((f: string) => f.endsWith(".json"))
    for (const file of files) {
      const p = safeReadJson<any>(path.join(projectsDir, file))
      if (!p || !p.id) continue

      const pTech = p.technologies || []
      const pCat = p.category || []
      const pKeywords = p.keywords || []
      const pAliases = p.aliases || []
      const allKeywords = Array.from(new Set([p.id, p.title, ...pKeywords, ...pAliases, ...pTech]))

      // Overview Chunk
      chunks.push(
        createChunk({
          id: `project-${p.id}-overview`,
          entityId: p.id,
          entityType: "project",
          section: "overview",
          title: `${p.title} - Overview`,
          text: `Project: ${p.title} (ID: ${p.id}). Status: ${p.status}. Categories: ${pCat.join(", ")}. Summary: ${p.summary} Best for: ${(p.bestFor || []).join(", ")}.`,
          keywords: allKeywords,
          technologies: pTech,
          category: pCat,
          sourceUrl: p.sourceUrl || p.links?.live || p.links?.caseStudy || null
        })
      )

      // Problem & Solution Chunk
      if (p.problem || p.solution) {
        chunks.push(
          createChunk({
            id: `project-${p.id}-problem-solution`,
            entityId: p.id,
            entityType: "project",
            section: "problem-solution",
            title: `${p.title} - Problem & Solution`,
            text: `Problem addressed in ${p.title}: ${p.problem || "N/A"}. Solution implemented: ${p.solution || "N/A"}.`,
            keywords: allKeywords,
            technologies: pTech,
            category: pCat,
            sourceUrl: p.sourceUrl || p.links?.live || p.links?.caseStudy || null
          })
        )
      }

      // Architecture Chunk
      if (Array.isArray(p.architecture) && p.architecture.length > 0) {
        chunks.push(
          createChunk({
            id: `project-${p.id}-architecture`,
            entityId: p.id,
            entityType: "project",
            section: "architecture",
            title: `${p.title} - Architecture & System Design`,
            text: `Architecture of ${p.title}: ${p.architecture.join(" ")}`,
            keywords: ["architecture", "system design", "data flow", ...allKeywords],
            technologies: pTech,
            category: pCat,
            sourceUrl: p.sourceUrl || p.links?.live || p.links?.caseStudy || null
          })
        )
      }

      // Results & Allowed Claims Chunk
      if (p.allowedClaims || p.restrictedClaims || p.outcomes) {
        const allowed = (p.allowedClaims || []).join(" ")
        const restricted = (p.restrictedClaims || []).join(" ")
        const outcomes = (p.outcomes || []).join(" ")
        chunks.push(
          createChunk({
            id: `project-${p.id}-results`,
            entityId: p.id,
            entityType: "project",
            section: "results",
            title: `${p.title} - Outcomes & Grounding Boundaries`,
            text: `Outcomes for ${p.title}: ${outcomes}. Allowed Claims: ${allowed}. Restricted/Private Details: ${restricted}`,
            keywords: ["results", "outcomes", "claims", "evidence", ...allKeywords],
            technologies: pTech,
            category: pCat,
            sourceUrl: p.sourceUrl || p.links?.live || p.links?.caseStudy || null
          })
        )
      }
    }
  }

  cachedChunks = chunks
  return chunks
}

/**
 * Resets the in-memory cache (primarily used in tests or after knowledge updates).
 */
export function resetKnowledgeCache(): void {
  cachedChunks = null
}
