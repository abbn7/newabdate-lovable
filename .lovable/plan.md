- خطة تحسينات بصرية + Accessibility (بدون حذف أو تغيير محتوى)

النطاق محصور في **Hero + Home** و **Projects (list + case study)**. كل شيء **additive** — ما فيش حذف لأي ملف/عنصر/نص/لون/تصميم، وما فيش تغيير في السلوك أو الـ layout.

## 1. Micro-interactions polish

`**src/components/hero.tsx**`

- إضافة hover tilt خفيف جدًا (`translate-y-[-2px]` + shadow lift عبر transition موجودة أصلاً) على الـ CTA buttons — بدون تغيير الحجم أو اللون.
- تحسين الـ chips row: إضافة `transition-colors` + hover state خفيف على الـ `glass-subtle` (يستخدم متغير `--glass-3` الموجود).
- ما فيش تغيير على الـ canvas أو النصوص أو الترتيب.

`**src/routes/index.tsx**` (Featured project card, Process cards, Skills chips)

- إضافة `group` + `group-hover:translate-x-0.5` خفيف على أيقونة `ArrowUpRight` في CTA — حركة صغيرة عند hover فقط.
- تحسين hover على `GlassCard` الخاص بالـ Process: `hover:bg-[var(--glass-3)]` transition ناعمة (المتغير موجود، مش هيبوظ الثيم).
- Skills chips: إضافة `transition-colors hover:text-foreground` (اللون الحالي `text-foreground/85` يبقى default).

`**src/routes/projects.index.tsx**` و `**src/routes/projects.$slug.tsx**`

- إضافة hover state على cards المشاريع (lift خفيف + بورد glow يستخدم `--glass-border` الموجود).
- إضافة `transition` ناعمة على صور الـ gallery في case study (scale 1 → 1.02 عند hover على المحتوي فقط، بدون قص الصور).
- ما فيش تغيير في محتوى أو ترتيب أو تصميم البطاقات.

## 2. Accessibility (a11y) — بدون تغيير مرئي

**Icon-only controls**

- التأكد من وجود `aria-label` على كل زر/رابط icon-only في: `nav.tsx`, `footer.tsx`, `whatsapp-fab.tsx`, `dev-mode.tsx`, `theme-toggle.tsx`, `lang-toggle.tsx`. إضافة اللي ناقص فقط.
- روابط GitHub / Live في `index.tsx` و `projects.$slug.tsx` — التأكد إن كل `<a target="_blank">` عنده `rel="noreferrer"` (موجود) + `aria-label` وصفي لما النص مش كافي.

**Focus visibility**

- إضافة `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background` على الأزرار والروابط اللي مالهاش focus ring واضح حالياً (CTAs في Hero و Featured و CTA section). الحلقة تظهر فقط عند keyboard focus — مش هتأثر على الماوس.

**Semantics**

- التأكد من وجود `<main>` واحد فقط (موجود في `__root.tsx` عبر `<main className="relative">` — تأكيد فقط).
- التأكد إن `alt` على الصور موجود ووصفي (cover في Home + gallery في case study). إضافة `alt=""` للصور الديكورية لو موجودة بدون معنى.
- التأكد من H1 واحد على كل صفحة (Hero يحتوي H1، الصفحات الداخلية تستخدم H1 مرة واحدة).

**Reduced motion**

- إضافة `motion-reduce:transition-none motion-reduce:hover:transform-none` على الـ hover animations الجديدة اللي هتتضاف — احترام `prefers-reduced-motion`.

**Tap targets (mobile)**

- التأكد إن كل الـ icon buttons ≥ 44x44 على mobile (WhatsApp/Dev FABs موجودين كده، nav icons — فحص وإضافة `min-h-11 min-w-11` لو ناقص).

## 3. الملفات المتوقع تعديلها

- `src/components/hero.tsx` — hover states + focus rings (additive classes only)
- `src/routes/index.tsx` — hover polish على Featured/Process/Skills + focus rings + aria-labels
- `src/routes/projects.index.tsx` — hover على cards + focus rings
- `src/routes/projects.$slug.tsx` — hover على gallery + focus rings + aria-labels
- `src/components/nav.tsx`, `src/components/footer.tsx` — aria-labels فقط لو ناقصة، + tap-target sizing
- `src/components/glass-card.tsx` — قد نضيف optional `interactive` prop (opt-in، الاستخدامات الحالية ما تتأثرش)

## 4. Out of scope (مضمون إنها ما تتغيرش)

- ❌ ما فيش حذف لأي مكون أو route أو نص أو صورة أو حقل.
- ❌ ما فيش تغيير في الألوان أو الخطوط أو الـ tokens في `styles.css`.
- ❌ ما فيش تغيير في الـ layout / grid / spacing الأساسي.
- ❌ ما فيش تعديل على الـ 3D canvas أو intro أو smooth scroll أو i18n.
- ❌ ما فيش تعديل على SEO metadata أو sitemap أو الـ blog article.
- ❌ ما فيش dependencies جديدة.

## 5. التحقق

- `bun run build` نظيف.
- فحص بصري بـ Playwright (390×844 + 1280×900، EN + AR) لـ `/`, `/projects`, `/projects/portfolio` — screenshots قبل/بعد للتأكد من عدم وجود تغيير في اللاي أوت.
- keyboard tab-through على الصفحة الرئيسية 
- للتأكد من ظهور focus rings.
- قبل التنفيذ:
  1) خلي arrow hover في index.tsx RTL-aware: rtl:group-hover:-translate-x-0.5 جنب الأصلي.
  2) ضيف نفس focus-visible ring (اللي هتضيفه للـ CTAs) على project cards في projects.index.tsx بالظبط.
  3) تأكد الـ gallery image container فيه overflow-hidden قبل تطبيق scale-102.
  &nbsp;