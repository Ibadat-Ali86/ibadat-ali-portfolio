# SECTIONS_SPEC.md

## Global navigation

Sticky 64–68px bar with brand, `About`, `Capabilities`, `Featured`, `Project Atlas`, `Interview`, and `Contact`. Add a skip link and active-section indication through IntersectionObserver.

## 01 / Hero

Minimum 100svh. Wide layout: eight-column copy and four-column abstract system visual. Include eyebrow, three-line headline, subheadline, two CTAs, and a technical signal strip.

## 02 / About

Five-column user photo and seven-column copy on desktop. Use `public/assets/profile/ibadat-profile.webp`; retain a development warning until the real asset exists. Add a credibility strip describing end-to-end ownership, research practice, and delivery.

## 03 / Capabilities

Four columns:
- Data Science & Analytics
- ML & Research Engineering
- Full-Stack AI Products
- DevOps, Delivery & Reliability

Each card starts with an outcome statement, then a compact stack list.

## 04 / Featured Systems

Seven large cards in this order:
1. CodeScope MCP Preflight
2. CareVision
3. SentinelIQ
4. TopoLite-KD
5. AdaptIQ / ForecastAI
6. VITAL-LINK
7. Evershine Academy LMS

Use an alternating two-column editorial layout. Let the seventh card span both columns. Evershine shows only `VISIT LIVE WEBSITE`.

## 05 / Complete Project Atlas

Include the remaining ten projects grouped by category. Provide accessible category filters as progressive enhancement; the default DOM order must remain meaningful.

### Full-Stack & Client Platforms
- AI Resume Builder
- Personalized AI Learning Dashboard

### Analytics & BI
- COVID-19 Global Analytics Platform
- Vendor Performance Analysis
- Netflix Data Analysis

### Data Science & Forecasting
- Pakistan E-commerce Price Prediction

### ML & Data Labs
- MNIST Logistic Regression
- Email / SMS Spam Classifier
- Employee Information Form
- CSV Data Cleaner

Selected cards use a two-column grid; labs use a three-column compact grid above 1100px.

## 06 / Interview

Cobalt full-width section with a 16:9 media frame. Asset path: `/assets/video/interview.mp4`. Muted playback at 55% visibility, pause on exit, native controls, poster fallback, and mandatory captions track.

## 07 / Social

Five visible text-and-icon links: LinkedIn, TikTok, Instagram, Kaggle, GitHub. Do not use icons alone.

## 08 / Contact

Near-black background, white type, acid primary CTA. Until an email or form endpoint is verified, use LinkedIn as the primary contact path. No fake form submission.

## Footer

Current year, concise positioning statement, back-to-top link, and no repository counters.
