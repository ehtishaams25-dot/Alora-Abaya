import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function WhyChooseUsSection() {
  const { i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')
  const base = import.meta.env.BASE_URL

  return (
    <section className="w-full bg-sand py-20 lg:py-48 min-h-[100svh] flex flex-col justify-center">
      <div className="container-alora mx-auto">
        
        {/* Text Section (Two Columns) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 xl:gap-24 mb-10 lg:mb-32">
          
          {/* Left Column: Headline */}
          <div className="w-full lg:w-[50%] xl:w-[55%]">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] text-espresso font-normal tracking-tight leading-[1.08]"
            >
              {isArabic 
                ? 'تصميم ينبض بالدقة، لا مجال للتخمين.' 
                : 'A design atelier built on precision, not guesswork.'}
            </motion.h2>
          </div>

          {/* Right Column: Paragraph Text */}
          <div className="w-full lg:w-[45%] xl:w-[40%] mt-2 lg:mt-4">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-mocha text-base sm:text-lg xl:text-[19px] leading-[1.75] font-sans"
            >
              {isArabic 
                ? 'تأسست ألورا لتكون دار أزياء متكاملة مقرها الرياض. نجمع بين التصميم المعماري للقصّات والخياطة الراقية تحت سقف واحد، لتتم توجيه قطعتك بواسطة فريق واحد متكامل من السكتش الأول وحتى اللمسة النهائية. سواء كنتِ تبحثين عن إطلالة يومية راقية أو فستان سهرة خالد، نحن نقدم أزياء مدروسة بقدر ما هي جميلة.' 
                : 'Founded in Riyadh, Alora is a full-service design atelier. We bring architectural draping, exquisite textile selection, and haute couture tailoring under one roof, so your piece is guided by a single integrated team from the first sketch to the final stitch. Whether you’re looking for refined everyday elegance or a timeless evening gown, we deliver abayas and dresses that are as thoughtful as they are beautiful.'}
            </motion.p>
          </div>
        </div>

        {/* Premium Bento Grid Collage */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[45vw] sm:auto-rows-[30vw] md:auto-rows-[280px] lg:auto-rows-[320px] gap-1.5 sm:gap-4 lg:gap-6 mt-10">
          
          {/* Image 1: Large feature */}
          <motion.div 
            className="col-span-2 row-span-2 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <img 
              src={`${base}images/homepage%20img%201.png`} 
              alt="Alora Design 1" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>
          
          {/* Image 2: Wide landscape */}
          <motion.div 
            className="col-span-2 row-span-1 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <img 
              src={`${base}images/homepage%20img%205.png`} 
              alt="Alora Design Details" 
              className="w-full h-full object-cover absolute inset-0 object-top"
            />
          </motion.div>
          
          {/* Image 3: Tall portrait */}
          <motion.div 
            className="col-span-1 row-span-2 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <img 
              src={`${base}images/homepage%20img%203.png`} 
              alt="Alora Craftsmanship" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>
          
          {/* Image 4: Small square */}
          <motion.div 
            className="col-span-1 row-span-1 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <img 
              src={`${base}images/homepage%20img%202.png`} 
              alt="Alora Fabric" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>
          
          {/* Image 5: Wide landscape */}
          <motion.div 
            className="col-span-2 row-span-1 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <img 
              src={`${base}images/homepage%20img%207.png`} 
              alt="Alora Collection" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>
          
          {/* Image 6: Small square */}
          <motion.div 
            className="col-span-1 row-span-1 bg-sand overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <img 
              src={`${base}images/homepage%20img%206.png`} 
              alt="Alora Finishes" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>

        </div>

      </div>
    </section>
  )
}
