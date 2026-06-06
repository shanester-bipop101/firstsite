/* =========================================================
   Intel Sustainability Timeline — language + RTL + UI logic
   ========================================================= */
 
/* 1. Translation dictionary -------------------------------- */
const translations = {
  en: {
    skipLink: "Skip to main content",
    siteTitle: "Intel Sustainability Timeline",
    langLabel: "Language",
    journeyHeading: "Our Sustainability Journey",
    learnMore: "Learn More",
    closeLabel: "Close",
 
    water_title: "Water Conservation",
    water_summary: "Advanced water recycling systems.",
    water_details: "Intel invested heavily in water conservation initiatives and implemented advanced reclamation technologies that reduced freshwater consumption while supporting manufacturing growth.",
 
    renewable_title: "Renewable Energy Expansion",
    renewable_summary: "Large-scale renewable energy adoption.",
    renewable_details: "Intel expanded renewable energy purchases and invested in cleaner electricity sources including wind and solar projects.",
 
    emissions_title: "Greenhouse Gas Reduction",
    emissions_summary: "Lowering manufacturing emissions.",
    emissions_details: "New technologies and efficiency upgrades helped reduce emissions while improving operational performance.",
 
    netwater_title: "Net Positive Water",
    netwater_summary: "Restoring more water than consumed.",
    netwater_details: "Intel works with environmental organizations and communities to restore watersheds and improve water availability.",
 
    netzero_title: "Net-Zero Emissions",
    netzero_summary: "Achieving carbon neutrality.",
    netzero_details: "Intel's long-term goal is net-zero greenhouse gas emissions through innovation, renewable energy, and supply-chain collaboration.",
 
    newsletterHeading: "Stay Updated",
    newsletterSub: "Subscribe to our sustainability newsletter.",
    emailLabel: "Email address",
    emailHelp: "We'll never share your email.",
    emailError: "Please enter a valid email address.",
    subscribe: "Subscribe",
    subscribed: "Thanks for subscribing!",
    footerText: "© 2025 Intel Sustainability Timeline. Educational project."
  },
  ar: {
    skipLink: "تخطَّ إلى المحتوى الرئيسي",
    siteTitle: "الجدول الزمني لاستدامة إنتل",
    langLabel: "اللغة",
    journeyHeading: "رحلتنا نحو الاستدامة",
    learnMore: "اعرف المزيد",
    closeLabel: "إغلاق",
 
    water_title: "الحفاظ على المياه",
    water_summary: "أنظمة متقدمة لإعادة تدوير المياه.",
    water_details: "استثمرت إنتل بكثافة في مبادرات الحفاظ على المياه ونفّذت تقنيات متقدمة لاستعادة المياه قلّلت من استهلاك المياه العذبة مع دعم نمو التصنيع.",
 
    renewable_title: "التوسع في الطاقة المتجددة",
    renewable_summary: "اعتماد الطاقة المتجددة على نطاق واسع.",
    renewable_details: "وسّعت إنتل مشترياتها من الطاقة المتجددة واستثمرت في مصادر كهرباء أنظف تشمل مشاريع طاقة الرياح والطاقة الشمسية.",
 
    emissions_title: "خفض غازات الاحتباس الحراري",
    emissions_summary: "خفض انبعاثات التصنيع.",
    emissions_details: "ساعدت التقنيات الجديدة وتحسينات الكفاءة في خفض الانبعاثات مع تحسين الأداء التشغيلي.",
 
    netwater_title: "صافي مياه إيجابي",
    netwater_summary: "إعادة كمية مياه أكبر مما يُستهلك.",
    netwater_details: "تعمل إنتل مع المنظمات البيئية والمجتمعات لاستعادة مستجمعات المياه وتحسين توافر المياه.",
 
    netzero_title: "صافي انبعاثات صفري",
    netzero_summary: "تحقيق الحياد الكربوني.",
    netzero_details: "هدف إنتل طويل المدى هو الوصول إلى صافي انبعاثات صفري لغازات الاحتباس الحراري من خلال الابتكار والطاقة المتجددة والتعاون في سلسلة التوريد.",
 
    newsletterHeading: "ابقَ على اطلاع",
    newsletterSub: "اشترك في نشرتنا الإخبارية حول الاستدامة.",
    emailLabel: "البريد الإلكتروني",
    emailHelp: "لن نشارك بريدك الإلكتروني أبدًا.",
    emailError: "يرجى إدخال بريد إلكتروني صالح.",
    subscribe: "اشترك",
    subscribed: "شكرًا لاشتراكك!",
    footerText: "© 2025 الجدول الزمني لاستدامة إنتل. مشروع تعليمي."
  }
};
 
/* Languages that should trigger RTL */
const RTL_LANGS = ["ar", "he", "fa", "ur"];
 
const BS_LTR = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
const BS_RTL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";
 
/* 2. Apply a language: set dir, swap Bootstrap build, replace text -- */
function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  const isRTL = RTL_LANGS.includes(lang);
 
  // a) document direction + lang (drives Lighthouse + native text flow)
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
 
  // b) swap to Bootstrap's RTL stylesheet so the grid/utilities flip
  document.getElementById("bootstrap-css").href = isRTL ? BS_RTL : BS_LTR;
 
  // c) replace visible text
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
 
  // d) replace aria-labels flagged with data-i18n-aria
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
  });
 
  // keep the dropdown in sync
  const sel = document.getElementById("langSelect");
  if (sel && sel.value !== lang) sel.value = lang;
}
 
/* 3. Wire everything up on load --------------------------- */
document.addEventListener("DOMContentLoaded", () => {
 
  // a) detect the browser's preferred language on first load
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  const startLang = translations[browserLang] ? browserLang : "en";
  applyLanguage(startLang);
 
  // b) detect manual language changes
  document.getElementById("langSelect")
    .addEventListener("change", (e) => applyLanguage(e.target.value));
 
  // c) fill the reusable modal from whichever card was clicked
  const modal = document.getElementById("detailModal");
  modal.addEventListener("show.bs.modal", (e) => {
    const key = e.relatedTarget.getAttribute("data-milestone");
    const dict = translations[document.documentElement.lang] || translations.en;
    modal.querySelector("#detailModalLabel").textContent = dict[key + "_title"];
    modal.querySelector("#detailModalBody").textContent = dict[key + "_details"];
  });
 
  // d) accessible form validation + success message
  const form = document.getElementById("subscribeForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const dict = translations[document.documentElement.lang] || translations.en;
    const msg = document.getElementById("formMessage");
    msg.textContent = dict.subscribed;       // announced via role="status"
    msg.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
});