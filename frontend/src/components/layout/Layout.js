import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Layout.module.css";
import Link from "next/link";
import AuthModal from "../modules/Modals/AuthModal";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { toFarsiNumber } from "@/utils/helper";
import { useRouter } from "next/router";
import navLinks from "@/utils/navLinks";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();
  const currentPath = router.pathname;
  const { data: user } = useAuth();
  const logout = useLogout();

  useEffect(() => {
    const handleOpenLoginModal = () => setShowLoginModal(true);
    window.addEventListener("openLoginModal", handleOpenLoginModal);
    return () =>
      window.removeEventListener("openLoginModal", handleOpenLoginModal);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <Image
              src="/icons/logo.png"
              alt="logo"
              width={146}
              height={44}
              className={styles.headerLogo}
            />
          </Link>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger menu"
            width={24}
            height={24}
            className={styles.headerMobile}
            onClick={() => setMenuOpen(true)}
          />
        </div>

        <div className={styles.headerMobile}>
          {!user ? (
            <Image
              src="/icons/mobileBtn.svg"
              alt="sign in button"
              width={32}
              height={32}
              onClick={() => setShowLoginModal(true)}
            />
          ) : (
            <div className={styles.userMenu}>
              <div className={styles.userTrigger}>
                <Image
                  src="/icons/profile.svg"
                  alt="profile"
                  width={24}
                  height={24}
                />
                <span className={styles.userTrigger__number}>
                  {toFarsiNumber(user.mobile)}
                </span>
                <Image
                  src="/icons/arrow-down.svg"
                  alt="arrow down"
                  width={12}
                  height={12}
                />
              </div>

              <div className={styles.dropdown}>
                <button className={styles.dropdownProfile}>
                  <Image
                    src="/icons/profff.png"
                    alt="profile icon"
                    width={24}
                    height={24}
                  />
                  <span>{toFarsiNumber(user.mobile)}</span>
                </button>
                <Link href="/dashboard" className={styles.dropdownItem}>
                  <Image
                    src="/icons/profile-grey.svg"
                    alt="profile icon"
                    width={24}
                    height={24}
                  />
                  اطلاعات حساب کاربری
                </Link>
                <button className={styles.dropdownItemLogout} onClick={logout}>
                  <Image
                    src="/icons/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                  خروج از حساب کاربری
                </button>
              </div>
            </div>
          )}
        </div>

        <nav className={styles.headerMiddle}>
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    currentPath === href
                      ? styles.headerMiddle__active
                      : styles.btn
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {menuOpen && (
          <div
            className={`${styles.backdrop} ${menuOpen ? styles.show : ""}`}
            onClick={() => setMenuOpen(false)}
          />
        )}

        <nav className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          <ul>
            {navLinks.map(({ href, label, icon }) => (
              <li key={href} onClick={() => setMenuOpen(false)}>
                <Image src={icon} alt={label} width={24} height={24} />
                <Link href={href} className={styles.btn}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerLeft}>
          {!user ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className={styles.loginBtn}
            >
              <Image
                src="/icons/profile.svg"
                alt="profile icon"
                width={24}
                height={24}
                className={styles.footerLogo}
              />
              ورود | ثبت‌ نام
            </button>
          ) : (
            <div className={styles.userMenu}>
              <div className={styles.userTrigger}>
                <Image
                  src="/icons/profile.svg"
                  alt="profile"
                  width={24}
                  height={24}
                />
                <span className={styles.userTrigger__number}>
                  {toFarsiNumber(user.mobile)}
                </span>
                <Image
                  src="/icons/arrow-down.svg"
                  alt="arrow down"
                  width={12}
                  height={12}
                />
              </div>

              <div className={styles.dropdown}>
                <button className={styles.dropdownProfile}>
                  <Image
                    src="/icons/profff.png"
                    alt="profile icon"
                    width={24}
                    height={24}
                  />
                  <span>{toFarsiNumber(user.mobile)}</span>
                </button>
                <Link href="/dashboard" className={styles.dropdownItem}>
                  <Image
                    src="/icons/profile-grey.svg"
                    alt="profile icon"
                    width={24}
                    height={24}
                  />
                  اطلاعات حساب کاربری
                </Link>
                <button className={styles.dropdownItemLogout} onClick={logout}>
                  <Image
                    src="/icons/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                  خروج از حساب کاربری
                </button>
              </div>
            </div>
          )}
        </div>

        <AuthModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </header>

      <hr className={styles.line} />
      <main className={styles.main}>{children}</main>
      <hr className={styles.line} />
      <hr className={styles.headerMobile} />

      <footer className={styles.footerContainer}>
        <div className={styles.footer}>
          <div className={styles.footerRight}>
            <h3>تورینو</h3>
            <ul>
              <li>
                <Link href="/about-us">درباره ما</Link>
              </li>
              <li>
                <Link href="/contact-us">تماس با ما</Link>
              </li>
              <li>چرا نوترینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
          </div>

          <div className={styles.footerMiddle}>
            <h3>خدمات مشتریان</h3>
            <ul>
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
            </ul>
          </div>

          <div className={styles.footerLeft}>
            <div>
              <Image
                src="/icons/logo.png"
                alt="logo"
                width={146}
                height={44}
                className={styles.footerLogo}
              />
              <p>
                تلفن پشتیبانی: <span>۸۵۷۴-۰۲۱</span>
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src="/icons/aira-682b7c43.png"
                alt="aira-logo"
                width={68}
                height={55}
                className={styles.footerImage}
              />
              <Image
                src="/icons/samandehi-6e2b448a.png"
                alt="E-namad-logo"
                width={68}
                height={55}
                className={styles.footerImage}
              />
              <Image
                src="/icons/ecunion-35c3c933.png"
                alt="qrcode"
                width={68}
                height={55}
                className={styles.footerImage}
              />
              <Image
                src="/icons/passenger-rights-48368f81 1.png"
                alt="passenger-right-logo"
                width={68}
                height={55}
                className={styles.footerImage}
              />
            </div>
          </div>
        </div>

        <hr className={styles.line} />
        <hr className={styles.headerMobile} />
        <h4>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</h4>
      </footer>
    </>
  );
};

export default Layout;
