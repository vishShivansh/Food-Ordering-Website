import Hero from "@/Components/layout/Hero.js";
import HomeMenu from "@/Components/layout/HomeMenu.js";
import SectionHeaders from "@/Components/layout/SectionHeaders.js";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptates, sapiente, voluptate magni suscipit perspiciatis voluptas
            iure vero accusamus beatae dolor ad dolorem culpa dolores, eum sequi
            et consequatur. Iusto.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            quidem, maiores natus ullam aliquid odit inventore consectetur earum
            nostrum enim. Quidem, libero facere? Doloribus molestias sit rem
            temporibus, cum blanditiis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            dolores explicabo quia dolorem dolor?
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a className="text-4xl" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
