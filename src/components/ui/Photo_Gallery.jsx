import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const images = [
  {
    src: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?cs=srgb&dl=pexels-shantanu-pal-938952-2679501.jpg&fm=jpg",
    title: "Fresh Salad",
    desc: "A healthy mix of greens and veggies.",
    delay: 0,
  },
  {
    src: "https://assets.epicurious.com/photos/5c4b7ab537d8ef4605419f1d/1:1/w_2560%2Cc_limit/St.-Patrick's-Day-Breakfast-Hash-012319.jpg",
    title: "Breakfast Hash",
    desc: "Perfect for a hearty morning.",
    delay: 0.5,
  },
  {
    src: "https://harteskildare.ie/wp-content/uploads/elementor/thumbs/hartes-food-1-1-750x683-1-r36iq96a4kqgbbghklpkp6wicnvtut54tu9ynp7wdc.jpg",
    title: "Gourmet Platter",
    desc: "A selection of our finest dishes.",
    delay: 1,
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcgGiZcsjnOTBRV-zQ_Mv9CVZ49GnHjGgLL9P5GNgV_7cXYTR9lYaEStc5XUoPXJSRnI&usqp=CAU",
    title: "Classic Burger",
    desc: "Juicy and delicious, always fresh.",
    delay: 1.15,
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hZmyHLNGdoCBCeL2u2IKInAkkfZ1CXbtzL5b__oRjR-PA8HfhjleZ08giTEJkW6uZtI&usqp=CAU",
    title: "Dessert Special",
    desc: "Sweet treats for every occasion.",
    delay: 1.3,
  },
];

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const imgVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: images[i].delay, duration: 0.7, type: "spring" }
  }),
  hover: { scale: 1.05 },
  rest: { scale: 1 },
};

const Photo_Gallery = () => {
  return (
    <div>
      <div className='relative py-16 px-4 sm:px-6 md:px-8 overflow-hidden'>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-base-content mb-12">
            Rich <span className="text-orange-500">Quality </span> Food
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {/* Main large image */}
            <motion.div
              className='relative'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={imgVariants}
              custom={0}
              whileHover="hover"
              whileTap="hover"
            >
              <motion.img
                src={images[0].src}
                alt={images[0].title}
                className='rounded-xl aspect-square w-full object-cover'
                variants={imgVariants}
                custom={0}
              />
              {/* Overlay */}
              <motion.div
                variants={overlayVariants}
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center opacity-0 transition"
              >
                <div className="text-white text-xl font-bold mb-2 sm:mb-4">{images[0].title}</div>
                <div className="hidden sm:block text-white text-sm mb-4">{images[0].desc}</div>
                <Link to={`/foods`} className="hidden sm:block px-4 py-2 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition">
                  See More
                </Link>
              </motion.div>
              {/* Mobile overlay: only title */}
              <div className="sm:hidden absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-white text-base font-bold">
                {images[0].title}
              </div>
            </motion.div>
            {/* 4 small images */}
            <div className='grid grid-cols-4 sm:grid-cols-2 gap-2'>
              {images.slice(1).map((img, i) => (
                <motion.div
                  key={img.src}
                  className="relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={imgVariants}
                  custom={i + 1}
                  whileHover="hover"
                  whileTap="hover"
                >
                  <motion.img
                    src={img.src}
                    alt={img.title}
                    className='rounded-xl w-full h-full aspect-square object-cover'
                    variants={imgVariants}
                    custom={i + 1}
                  />
                  {/* Overlay */}
                  <motion.div
                    variants={overlayVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="hover"
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center opacity-0 transition"
                  >
                    <div className="text-white text-base font-bold mb-1 sm:mb-2">{img.title}</div>
                    <div className="hidden sm:block text-white text-xs mb-2">{img.desc}</div>
                    <Link to={`/foods`} className="hidden sm:block px-3 py-1 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition text-xs">
                      See More
                    </Link>
                  </motion.div>
                  {/* Mobile overlay: only title */}
                  <div className="sm:hidden absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-xs font-bold">
                    {img.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo_Gallery;