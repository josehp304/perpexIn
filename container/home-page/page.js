'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  's1.webp',
  's2.webp',
  's3.webp',
  's4.webp',
  's5.webp',
  's6.webp',
  's7.webp',
  's8.webp',
  's9.webp',
  's10.webp',
  's11.webp',
  's12.webp'
 
];

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 767;
}

export default function Home() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [mobile, setMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });
  
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    const resize = () => {
      requestAnimationFrame(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
      });
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    setMobile(isMobile());
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (mobile) {
    return (
      <main className={styles.main}>
        <div className={styles.gallery} style={{ flexDirection: 'column', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '90vw', height: 'auto', position: 'relative' }}>
              <Image
                src="/mobilegal.png"
                alt="Mobile Gallery"
                width={900}
                height={1200}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '2vw' }}
                priority
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className={styles.main}>
      <div ref={gallery} className={styles.gallery}>
        <Column images={images.slice(0, 3)} y={y} />
        <Column images={images.slice(3, 6)} y={y2} />
        <Column images={images.slice(6, 9)} y={y3} />
        <Column images={images.slice(9, 12)} y={y4} />
      </div>
    </main>
  );
}

const Column = ({ images, y }) => (
  <motion.div className={styles.column} style={{ y }}>
    {images.map((src) => (
      <div key={src} className={styles.imageContainer}>
        <Image
          src={`/${src}`}
          alt={src}
          fill
          sizes="(max-width: 767px) 25vw, 25vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    ))}
  </motion.div>
);