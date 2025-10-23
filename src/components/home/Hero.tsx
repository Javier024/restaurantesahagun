import HeroImage from '../../assets/hero.webp';

export function HeroSection() {
  return (
    <section className="section-page">
      <article className="w-full overflow-hidden h-[85vh]">
        <img
          src={HeroImage}
          alt="Imagen de referencia"
          className="w-full h-full object-cover object-top opacity-90"
        />
      </article>
    </section>
  )
}
