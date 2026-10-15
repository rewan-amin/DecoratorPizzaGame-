# 🍕 EduPlay - Decorator Pattern Pizza Shop Game

لعبة تعليمية تفاعلية ممتعة ومميزة لشرح **Decorator Design Pattern** بأسلوب لعبة مطعم بيتزا تفاعلية لطيفة (مستوحاة من Good Pizza, Great Pizza).

---

## 🚀 كيفية رفع المشروع على Vercel (طريقتان سهلتان)

### 🌟 الطريقة الأولى (الأسهل والأفضل - عبر GitHub):
1. قم بإنشاء مستودع جديد (New Repository) فارغ على حسابك في [GitHub](https://github.com/new) وسمّه مثلاً `DecoratorPizzaGame`.
2. انسخ رابط المستودع الجديد، ثم افتح موجه الأوامر (Terminal) في مجلد المشروع واكتب:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/DecoratorPizzaGame.git
   git push -u origin main
   ```
3. ادخل على موقع [Vercel](https://vercel.com) وسجّل الدخول بحساب GitHub.
4. اضغط على **"Add New..."** ثم **"Project"**.
5. ستجد مستودع `DecoratorPizzaGame` ظهر مباشرة، اضغط **Import**.
6. سيتعرف Vercel تلقائياً على إعدادات Vite، فقط اضغط على **Deploy**!
7. مبروك! بعد 30 ثانية سيصبح لديك رابط مباشر لمشاركتها مع الجميع 🎉.

---

### ⚡ الطريقة الثانية (مباشرة عبر Vercel CLI بدون GitHub):
1. في موجه الأوامر (Terminal) داخل مجلد المشروع، اكتب:
   ```bash
   npx vercel
   ```
2. سيطلب منك تسجيل الدخول إلى Vercel (اضغط Enter وافتح الرابط في المتصفح).
3. أجب عن الأسئلة بضغط `Enter` لجميع الخيارات الافتراضية:
   - Set up and deploy? `y`
   - Which scope? (اختر حسابك)
   - Link to existing project? `N`
   - Project name? `decorator-pizza-game`
   - In which directory? `./`
4. سيتم رفع اللعبة وإعطاؤك رابط الإنتاج فوراً!

---

## 💻 لتشغيل المشروع محلياً على جهازك:
```bash
# تثبيت المكتبات (تم بالفعل)
npm install

# تشغيل خادم التطوير
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

---

## 🎵 الميزات الصوتية الجديدة:
- **Cozy Background Music**: موسيقى خلفية هادئة بأسلوب مطاعم البيتزا الإيطالية مبرمجة داخلياً بـ Web Audio API (لا تحتاج لإنترنت ولا لملفات خارجية).
- **Music Toggle Button**: زر في الشريط العلوي لتشغيل أو إيقاف الموسيقى حسب الرغبة.
- **Sound Effects**: مؤثرات صوتية تفاعلية (أصوات الضغط، إضافة الإضافات، صوت الخزينة عند بيع البيتزا، وأصوات الفوز).
