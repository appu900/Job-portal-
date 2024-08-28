import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faq from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center tracking-tighter py-4 justify-center gradient-title text-4xl font-bold sm:text-6xl lg:text-8xl">
          Find Your Dream Jobs
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img src="/logo.png" alt="Hired" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl capitalize">
          Explore thousand of jobs Listing or find the perfect candidates
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/postjob">
          <Button size="xl" variant="destructive">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* carausals */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: true,
          }),
        ]}
        className="py-10 w-full"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                className="h-9 sm:h-14 object-contain"
                alt={name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* banner */}

      <img src="/banner.jpeg" alt="" className="w-full" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle>For Students</CardTitle>
          </CardHeader>
          <CardContent>
            Search And Apply for jobs track Applications And More
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle>For Employeers</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs Manage Applications and Find Best Candidates
          </CardContent>
        </Card>
      </section>

      {/* Accordians  */}
      <Accordion type="multiple" className="w-full">
        {faq.map(({ question, answer, index }) => {
          return (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}
