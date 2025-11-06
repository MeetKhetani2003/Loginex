import AboutSection from '@/components/Home/AboutSection';
import HeroSection from '@/components/Home/Hero'
import ServicesSection from '@/components/Home/ServicesSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import VPSTiersSection from '@/components/Home/VpsPlans';
import WhyChooseUsSection from '@/components/Home/WhyChoose';
import React from 'react'

const page = () => {
  return (
    <>
      <HeroSection /> 
      <AboutSection />
      <VPSTiersSection/>
      <WhyChooseUsSection/>
      <ServicesSection />
      <TestimonialsSection />
    </>
  );
}

export default page