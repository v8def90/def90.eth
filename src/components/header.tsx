import ThemeToggleButton from '@components/ThemeToggleButton'; //eslint-disable-line
import { siteMeta } from '@lib/constants';

export const Header = () => {
  return (
    <>
      <header className="py-6">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <a
            className="flex gap-2 text-lg font-bold text-inherit no-underline hover:underline"
            rel="prefetch"
            href="/"
          >
            <img src="/Calm.png" alt="" width="28" height="28" />
            {siteMeta.siteTitle}
          </a>
          <div className="flex items-center gap-4">
            <ul className="flex gap-4">
              <li>
                <a className="text-inherit no-underline hover:underline" rel="prefetch" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="text-inherit no-underline hover:underline" rel="prefetch" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
            <ThemeToggleButton />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
