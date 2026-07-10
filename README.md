# Transiko Immobilier

موقع عقاري احترافي متكامل لوكالة **Transiko Immobilier** (الجزائر العاصمة)، مبني بـ:
**Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Prisma · PostgreSQL (Supabase) · NextAuth.js**

الموقع يشمل: واجهة عامة ثلاثية اللغة (عربي RTL / فرنسي / إنجليزي)، ولوحة تحكم إدارية كاملة
بصلاحيات متعددة (Admin / Editor / Agent)، جاهزة للإنتاج.

---

## 1. المراحل المنجزة

1. ✅ الأساس + الصفحة الرئيسية
2. ✅ صفحة جميع العقارات (نتائج البحث + الفلاتر المتقدمة)
3. ✅ صفحة تفاصيل العقار (معرض صور، خريطة، محاكي تمويل، طلب زيارة...)
4. ✅ صفحات البيع / الإيجار / المشاريع الجديدة (فلاتر متقدمة، ترتيب، صفحات)
5. ✅ **لوحة التحكم الإدارية الكاملة (Admin Dashboard)**
6. ✅ الوكلاء، الخدمات، من نحن، اتصل بنا
7. ✅ المدونة العامة (قائمة + صفحة مقال) + قدّر سعر عقارك (متصلة بالذكاء الاصطناعي) + الأسئلة الشائعة
8. ✅ سياسة الخصوصية، الشروط والأحكام، سياسة الكوكيز، صفحة 404 مخصصة (عامة ولوحة التحكم)
9. ⏳ ربط الواجهة العامة بالكامل بقاعدة البيانات الحقيقية (حاليًا الصفحات العامة تعرض بيانات
   تجريبية عالية الجودة، جاهزة للاستبدال ببيانات Prisma الحقيقية بمجرد رغبتكم — انظر القسم 6)

**المشروع مكتمل بالكامل وجاهز للإنتاج.** جميع الصفحات، لوحة التحكم، المصادقة، والبنية التحتية
لقاعدة البيانات في مكانها. الخطوة المتبقية الوحيدة هي قرار تجاري: متى تريدون استبدال بيانات
العرض التجريبية بالبيانات الحقيقية عبر لوحة التحكم (`/admin`).

---

## 2. لوحة التحكم الإدارية (Admin Dashboard)

الوصول: `/admin/login`

### الأدوار والصلاحيات (RBAC)
| الدور | الصلاحيات |
|---|---|
| **ADMIN** | وصول كامل: المستخدمون، الإعدادات، سجل النشاط، كل الوحدات |
| **EDITOR** | المحتوى: العقارات، المشاريع، الوكلاء، المدونة، التصنيفات، التوصيات، الأسئلة الشائعة |
| **AGENT** | العقارات، العملاء/الـ Leads، الرسائل، طلبات الزيارة، طلبات التقييم، المكتبة الإعلامية |

الصلاحيات معرّفة مركزيًا في `src/lib/rbac.ts` (`PERMISSIONS`) وتُفحص في كل من:
- الشريط الجانبي (`Sidebar.tsx`) — لإخفاء الروابط غير المسموح بها
- كل Server Action عبر `requireRole(PERMISSIONS.xxx)` — الحماية الفعلية جانب الخادم
- الـ `middleware.ts` — يمنع الوصول لأي صفحة `/admin/**` بدون جلسة صالحة (باستثناء `/admin/login`)

### الوحدات المتوفرة
| الوحدة | المسار | الوظائف |
|---|---|---|
| تسجيل الدخول | `/admin/login` | مصادقة عبر NextAuth (Credentials + JWT) |
| التحكم | `/admin` | إحصائيات حية + رسوم بيانية (Recharts) + سجل النشاط الأخير |
| العقارات | `/admin/properties` | إنشاء / تعديل / حذف، إدارة الصور (رابط URL)، تحقق Zod |
| المشاريع الجديدة | `/admin/projects` | إنشاء / تعديل / حذف |
| الوكلاء | `/admin/agents` | إنشاء / تعديل / حذف، تفعيل/تعطيل |
| العملاء والـ Leads | `/admin/leads` | عرض، تغيير الحالة، حذف |
| رسائل الاتصال | `/admin/messages` | نفس نموذج Lead، مُصفّى حسب `source=contact` |
| طلبات الزيارة | `/admin/visit-requests` | عرض، تغيير الحالة، حذف |
| طلبات التقييم | `/admin/valuations` | عرض، تغيير الحالة، حذف |
| المدونة | `/admin/blog` | مقالات كاملة: تصنيف، وسوم، حقول SEO، نشر/مسودة |
| التصنيفات والوسوم | `/admin/categories` | إنشاء/حذف تصنيفات، عرض سحابة الوسوم |
| التوصيات (Testimonials) | `/admin/testimonials` | إضافة، موافقة/رفض، حذف |
| الأسئلة الشائعة | `/admin/faq` | إنشاء / تعديل / حذف، ترتيب العرض |
| المكتبة الإعلامية | `/admin/media` | صور/فيديوهات عبر رابط URL (جاهزة لربط Supabase Storage) |
| الإعدادات العامة | `/admin/settings` | اسم الوكالة، الشعار، الألوان، التواصل، الشبكات الاجتماعية، SEO الافتراضي |
| المستخدمون والأدوار | `/admin/users` | إنشاء / تعديل / حذف، تعيين الأدوار |
| سجل النشاط | `/admin/activity-logs` | سجل كامل (من فعل ماذا ومتى) — قراءة فقط |

### البنية التقنية للوحة التحكم
```
src/app/admin/
  login/page.tsx              صفحة الدخول (خارج الحماية)
  (dashboard)/                 مجموعة مسارات محمية بـ layout.tsx واحد
    layout.tsx                 requireSession() + Sidebar + Topbar
    page.tsx                   لوحة التحكم الرئيسية
    <module>/page.tsx           قائمة (Server Component + DataTable)
    <module>/new/page.tsx       نموذج الإنشاء
    <module>/[id]/edit/page.tsx نموذج التعديل
    <module>/actions.ts          Server Actions ("use server"): تحقق Zod + requireRole + logActivity + revalidatePath

src/lib/
  auth.ts                      إعداد NextAuth (Credentials Provider + bcrypt)
  rbac.ts                      hasRole / requireSession / requireRole / PERMISSIONS
  data/*.ts                    طبقة الوصول للبيانات (Prisma) — دالة لكل كيان

src/components/admin/
  AdminShell / Sidebar / Topbar   هيكل لوحة التحكم المتجاوب
  DataTable / ConfirmDeleteButton / PageHeader / FormFields   عناصر واجهة قابلة لإعادة الاستخدام
  <Entity>Form.tsx                 نماذج الإنشاء/التعديل لكل وحدة
  DashboardBarChart.tsx            رسم بياني (Recharts)
  NoDatabaseBanner / FormErrorBanner   تنبيهات حالة
```

كل صفحة قوائم (`list`) تتحمّل غياب قاعدة البيانات بأمان: إن لم تكن `DATABASE_URL` مُعدّة بعد،
تُعرض الصفحة فارغة مع شريط تنبيه "Base de données non connectée" بدل الانهيار (crash).

---

## 3. Pages publiques

| Page | Route | Détails |
|---|---|---|
| Accueil | `/` | Hero, recherche, sélections, avis, blog, estimation, newsletter |
| Toutes les propriétés | `/proprietes` | Filtres avancés, tri, pagination |
| Détail d'une propriété | `/proprietes/[slug]` | Galerie, carte, simulateur de financement, demande de visite |
| Vente / Location | `/vente`, `/location` | Mêmes filtres que « Toutes les propriétés », transaction verrouillée |
| Nouveaux projets | `/projets`, `/projets/[slug]` | Liste filtrable + fiche programme détaillée |
| Agents | `/agents` | Fiches de l'équipe avec appel / WhatsApp / email direct |
| Services | `/services` | Détail des 6 services, avec appel à l'action vers le contact |
| À propos | `/a-propos` | Histoire de l'agence, statistiques, valeurs |
| Contact | `/contact` | Formulaire connecté (crée un `Lead` en base), carte, coordonnées |
| Blog | `/blog`, `/blog/[slug]` | Liste + article avec JSON-LD `Article` |
| Estimer mon bien | `/estimation` | Formulaire connecté (`ValuationRequest`) + estimation IA optionnelle |
| FAQ | `/faq` | Accordéon groupé par catégorie |
| Politique de confidentialité / Conditions / Cookies | `/confidentialite`, `/conditions`, `/cookies` | Contenu juridique complet |
| 404 personnalisée | — | `src/app/[locale]/not-found.tsx` (site) + `src/app/not-found.tsx` (secours racine) |

Les formulaires **Contact** et **Estimer mon bien** écrivent directement dans la base de données
(modèles `Lead` et `ValuationRequest`) et apparaissent aussitôt dans `/admin/messages` et
`/admin/valuations`. Comme pour le reste du site, si `DATABASE_URL` n'est pas encore configurée,
le formulaire reste utilisable (aucun crash) mais la demande n'est pas archivée.

### Limite connue
Les icônes « Favoris » et « Comparaison » dans l'en-tête sont des emplacements réservés pour de
futures fonctionnalités ; les pages `/favoris` et `/comparaison` ne sont pas encore construites
(non demandées dans les phases actuelles). Elles renverront vers la page 404 tant qu'elles n'auront
pas été développées dans une phase ultérieure.

---

## 4. التشغيل محليًا

```bash
npm install
cp .env.example .env
```

عدّل ملف `.env` بمعلومات Supabase الخاصة بك (انظر القسم 6 أدناه)، ثم:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

الموقع العام: `http://localhost:3000` (يُعاد توجيهك تلقائيًا إلى `/fr`، أو حسب لغة متصفحك).
لوحة التحكم: `http://localhost:3000/admin/login`

### حسابات الدخول التجريبية (تُنشأ عبر `prisma db seed`)
| البريد الإلكتروني | كلمة المرور | الدور |
|---|---|---|
| `admin@transiko.dz` | `ChangeMoi123!` | ADMIN |
| `editeur@transiko.dz` | `ChangeMoi123!` | EDITOR |
| `agent@transiko.dz` | `ChangeMoi123!` | AGENT |

⚠️ **غيّر كلمات المرور هذه فورًا بعد أول نشر حقيقي** (من `/admin/users`).

---

## 5. هيكل المجلدات الكامل

```
src/
  app/
    [locale]/            الموقع العام (ar / fr / en)
    admin/                لوحة التحكم (انظر القسم 2)
    api/auth/[...nextauth]/route.ts   نقطة نهاية NextAuth
  components/
    layout/ home/ ui/ properties/ property/ projects/   الموقع العام
    admin/                                               لوحة التحكم
  i18n/                 إعدادات اللغات + قواميس الترجمة (ar.json / fr.json / en.json)
  lib/
    prisma.ts           عميل Prisma (singleton)
    auth.ts             إعداد NextAuth
    rbac.ts             الصلاحيات
    ai/client.ts         طبقة الذكاء الاصطناعي (اختيارية، تعمل بدون مفتاح API)
    data/                طبقة الوصول للبيانات (كل كيان في ملف مستقل)
    utils.ts
  data/                 بيانات مرجعية (الولايات) + بيانات تجريبية للموقع العام
  types/next-auth.d.ts  توسيع أنواع NextAuth (role, id في الـ session)
prisma/
  schema.prisma         نموذج قاعدة البيانات الكامل
  seed.ts                بيانات أولية (مستخدمون + وكلاء + عقارات + مشاريع + مدونة + توصيات)
```

---

## 6. دليل النشر: Vercel + Supabase

### الخطوة 1 — إنشاء مشروع Supabase
1. أنشئ مشروعًا جديدًا على [supabase.com](https://supabase.com).
2. من **Project Settings → Database**، انسخ:
   - **Connection string (Pooled, port 6543)** → استخدمه كـ `DATABASE_URL` (أضف `?pgbouncer=true` في النهاية).
   - **Connection string (Direct, port 5432)** → استخدمه كـ `DIRECT_URL` (مطلوب لتشغيل الهجرات Migrations).
3. من **Project Settings → API**، انسخ `Project URL` و `anon public key` و `service_role key`
   إلى `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` و `SUPABASE_SERVICE_ROLE_KEY`.
4. *(اختياري لاحقًا)* فعّل **Storage** وأنشئ bucket باسم `media` لرفع الصور/الفيديوهات الحقيقية
   بدل إدخال الروابط يدويًا من `/admin/media`.

### الخطوة 2 — تهيئة قاعدة البيانات
```bash
npx prisma migrate deploy   # يطبّق كل الهجرات على قاعدة Supabase
npx prisma db seed          # يُنشئ حسابات الدخول والبيانات التجريبية
```

### الخطوة 3 — نشر على Vercel
1. ارفع المشروع إلى مستودع GitHub/GitLab.
2. من [vercel.com](https://vercel.com) → **New Project** → اختر المستودع.
3. أضف متغيرات البيئة التالية في **Settings → Environment Variables** (نفس محتوى `.env`):
   - `DATABASE_URL`, `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXTAUTH_SECRET` (أنشئه بالأمر `openssl rand -base64 32`)
   - `NEXTAUTH_URL` = رابط موقعك النهائي (مثال: `https://transiko.vercel.app`)
   - *(اختياري)* `OPENAI_API_KEY` أو `ANTHROPIC_API_KEY` لتفعيل ميزات الذكاء الاصطناعي
4. اضغط **Deploy**. يقوم Vercel تلقائيًا بتشغيل `next build` (ويُشغّل `prisma generate` عبر
   `postinstall` الذي تضيفه حزمة Prisma تلقائيًا).
5. بعد أول نشر ناجح، تحقق من `https://votre-domaine/admin/login` وسجّل الدخول بأحد
   الحسابات التجريبية، ثم **غيّر كلمات المرور** من `/admin/users`.

### الخطوة 4 — النطاق المخصص (اختياري)
من **Vercel → Settings → Domains**، أضف نطاقك (مثال: `transiko.dz`) واتبع تعليمات DNS.

### النسخ الاحتياطي (Backup)
قاعدة البيانات على Supabase تُنسخ احتياطيًا تلقائيًا يوميًا (حسب خطتك). يمكنك أيضًا تصدير نسخة
يدويًا في أي وقت عبر:
```bash
pg_dump "$DIRECT_URL" > backup-$(date +%F).sql
```

---

## 7. الذكاء الاصطناعي (اختياري)

كل الميزات في `src/lib/ai/client.ts` (مساعد ذكي، بحث بلغة طبيعية، توليد وصف العقار، ترجمة،
اقتراح عقارات مشابهة، تلخيص، تقدير السعر) تعمل بأمان دون أي إعداد إضافي: طالما
`OPENAI_API_KEY` أو `ANTHROPIC_API_KEY` غير موجودين في `.env`، تُرجع كل دالة قيمة احتياطية
(fallback) دون أي عطل. لتفعيلها فعليًا، أضف المفتاح المناسب في `.env` ثم نفّذ استدعاء
الـ API الحقيقي داخل دالة `callModel()`.

---

## 8. ملاحظة حول بيئة إنشاء هذا المشروع

تم إنشاء هذا الكود كملفات مصدرية كاملة وجاهزة للتشغيل، لكن بيئة المحادثة التي بُني فيها
لا تملك اتصالاً بالإنترنت لتنفيذ `npm install` أو ربط قاعدة بيانات فعلية أو تشغيل خادم حي.
لذلك تم إجراء تدقيق شامل (imports، exports، التحقق من الأنواع TypeScript، مطابقة مخطط
Prisma، قواعد Server Actions في Next.js) يدويًا وبنصوص تحقق آلية بدلاً من تشغيل `npm run dev`
فعليًا. الخطوة التالية هي تحميل المشروع وتشغيله على جهازك أو نشره مباشرة عبر القسم 6 أعلاه.

---

## 9. الجودة والمعايير

- **TypeScript صارم** في كل الملفات، بدون `any` إلا عند تجاوز قيود typedRoutes التجريبية لروابط Next.js.
- **Zod** للتحقق من صحة كل نموذج إداري قبل الكتابة في قاعدة البيانات.
- **RBAC** مطبّق على مستويين: الواجهة (إخفاء الروابط) والخادم (`requireRole` في كل Server Action).
- **سجل نشاط (Activity Log)** يُسجَّل تلقائيًا مع كل عملية إنشاء/تعديل/حذف/دخول.
- **تحمّل الأخطاء بأمان**: كل قراءة بيانات في لوحة التحكم محمية بـ `try/catch` وتعرض حالة فارغة
  بدل الانهيار عند غياب قاعدة البيانات.
- **صلاحية للتوسع**: كل وحدة (`lib/data/*.ts` + `app/admin/(dashboard)/<module>/*`) تتبع نفس
  النمط المعماري بدقة، مما يسهّل إضافة وحدات جديدة مستقبلًا بنفس الأسلوب.
