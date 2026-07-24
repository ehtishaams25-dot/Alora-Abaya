import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navigation } from "../components/Navigation";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { LoginForm, RegisterForm } from "@/features/auth";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle("Layali | Account Authentication ليالي");

  const [isRegister, setIsRegister] = useState(false);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="h-screen max-h-screen bg-sand text-espresso font-sans flex flex-col overflow-x-hidden md:overflow-hidden selection:bg-taupe/20 selection:text-espresso">
      {/* Exact sticky navigation bar */}
      <div className="shrink-0">
        <Navigation hideAnnouncement={true} />
      </div>

      {/* Main Split Layout: Desktop 50/50, Tablet 40/60 */}
      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-y-auto md:overflow-hidden">
        {/* Left Column: Full-height luxury editorial campaign image */}
        <section className="hidden md:flex md:col-span-5 lg:col-span-6 relative overflow-hidden group md:min-h-0 md:h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1600&q=90"
              alt={t("auth.imageTitle", "Timeless Elegance")}
              className="w-full h-full object-cover object-top sm:object-center transition-transform duration-[3000ms] ease-out group-hover:scale-105 animate-scale-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent mix-blend-normal" />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-taupe/10 mix-blend-overlay" />
          </div>

          <div className="relative z-10 max-w-lg animate-fade-up">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream font-normal tracking-tight leading-[1.08] drop-shadow-sm">
              {t("auth.imageTitle", "Timeless Elegance")}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-cream/85 tracking-wide mt-2 sm:mt-2.5 leading-relaxed max-w-md">
              {t(
                "auth.imageSubtitle",
                "Crafted for women who appreciate understated luxury.",
              )}
            </p>
          </div>
        </section>

        {/* Right Column: Centered Authentication Container */}
        <section className="md:col-span-7 lg:col-span-6 h-full min-h-0 flex flex-col justify-between bg-sand overflow-y-auto md:overflow-hidden">
          <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto px-6 sm:px-8 my-auto py-4 sm:py-6 flex flex-col justify-center animate-fade-up min-h-0">
            {/* Card Header */}
            <header className="mb-6 sm:mb-7 text-start shrink-0">
              <span className="text-eyebrow block mb-1.5 font-medium">
                {t("auth.eyebrow", "ACCOUNT")}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso tracking-tight font-normal leading-tight">
                {isRegister
                  ? t("auth.createAccountTitle", "Create Account")
                  : t("auth.title", "Welcome Back")}
              </h1>
              <p className="text-[13px] text-mocha mt-1.5 leading-relaxed">
                {isRegister
                  ? t(
                      "auth.createAccountSubtitle",
                      "Join our private circle for bespoke drops and atelier orders.",
                    )
                  : t(
                      "auth.subtitle",
                      "Sign in to access your orders, wishlist, and exclusive collections.",
                    )}
              </p>
            </header>

            {/* Form */}
            {isRegister ? (
              <RegisterForm
                onSuccess={handleSuccess}
                onToggleLogin={() => setIsRegister(false)}
              />
            ) : (
              <LoginForm
                onSuccess={handleSuccess}
                onToggleRegister={() => setIsRegister(true)}
              />
            )}
          </div>

          {/* Minimalist Footer */}
          <footer className="px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-mocha/70 uppercase tracking-[0.18em] font-sans border-t border-taupe/20 shrink-0 gap-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#privacy"
                className="hover:text-espresso transition-colors"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#terms"
                className="hover:text-espresso transition-colors"
              >
                TERMS
              </a>
              <a
                href="#returns"
                className="hover:text-espresso transition-colors"
              >
                RETURNS
              </a>
              <a
                href="#contact"
                className="hover:text-espresso transition-colors"
              >
                CONTACT
              </a>
            </div>
            <div>© 2026 ALORA • ATELIER RIYADH</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
