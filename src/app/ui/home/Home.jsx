import { BusinessInfo } from './BusinessInfo';
import { HomeHeader } from './HomeHeader';

export function Home({ businessInfo }) {
  return (
    <main className="flex gap-5 flex-col justify-center">
      <HomeHeader businessInfo={businessInfo} />
      <section className="flex flex-col justify-center items-center w-full gap-5 grow">
        <BusinessInfo businessInfo={businessInfo} />
      </section>
    </main>
  );
}
