"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const yogaCategories = [
  {
    id: "warmup",
    title: "Loosening & Warm-up (Sukshma Vyayama)",
    items: [
      "Neck movements",
      "Shoulder movements",
      "Wrist/palm movements",
      "Fingers loosening",
      "Waist rotation",
      "Shishupal asana",
      "Half & Full Butterfly",
      "Knee movements",
      "Ankle/Toe movements",
      "Kati chakrasana",
      "Gatyatmak Padhastasana",
      "Utthita Lolasana",
      "Side bending in sitting",
      "Chakki chalana",
      "Chapati Making",
      "Sitting Cat-Cow",
      "Marjari-Bitilasana",
      "Vyaghrasana",
      "Threading the needle",
      "Lizard stretch",
      "Pyramid stretch",
      "Adho mukha Kapotasana",
      "Utkatasana situps",
      "Parvat asana walking",
      "Frog Jumping",
      "Lizard Walking",
      "Toe Jogging/High knee/Forward bend jogging/Jumping Jacks/Mukha Dhouti",
      "Knee to Elbow in Plank",
      "Shashank-bhujanga swing",
      "Dynamic Ashwasanchalana",
      "Bhujangasana-Parvatasana Swing",
    ],
  },
  {
    id: "namaskara",
    title: "Namaskara",
    items: [
      "Surya Namaskara (Sun Salutation)",
      "Chandra Namaskara (Moon Salutation)",
    ],
  },
  {
    id: "standing",
    title: "Standing Asanas",
    items: [
      "Tadasana",
      "Triyak Tadasana",
      "Utkatasana",
      "Dwikonasana",
      "Trikonasana",
      "Samakonasana",
      "Padahastasana",
      "Gatyatmak Padahastasana",
      "Sirsha Angustha Yogasana",
      "Vatyan asana",
      "Prishthasana",
      "Ardha Chandrasana",
    ],
  },
  {
    id: "balancing",
    title: "Balancing Asanas",
    items: [
      "Eka Pada Pranamasana/Vrikshasana",
      "Garudasana",
      "Hamsasana",
      "Santolanasana",
      "Saral Natraj asana",
      "Vashishthasana",
      "Brahmacharya asana",
      "Mayurasana",
      "Gorakshasana",
      "Astavakrasana",
      "Grivasana",
    ],
  },
  {
    id: "sitting",
    title: "Sitting Asanas",
    items: [
      "Baddha konasana",
      "Malasana",
      "Vajrasana",
      "Bhadrasana",
      "Simhasana",
      "Gomukhasana",
      "Naukasana",
      "Shashank asana/Balasana",
      "Naman Pranamasana",
      "Hanuman asana",
      "Dhanurakarshanasana",
    ],
  },
  {
    id: "twisting",
    title: "Spinal Twisting",
    items: [
      "Meru Wakrasana",
      "Gatyatmak Meru Vakrasana",
      "Bhu Namanasana",
      "Ardha Matsyendrasana",
      "Purna Matsyendrasana",
    ],
  },
  {
    id: "forward",
    title: "Forward Bending",
    items: [
      "Paschimottanasana",
      "Gatyatmak Paschimottasana",
      "Pada prasar Paschimottanasana",
      "Janu sirsasana",
    ],
  },
  {
    id: "backward",
    title: "Back Bending & Prone",
    items: [
      "Saral bhujangasana",
      "Bhujangasana",
      "Triyak bhujangasana",
      "Ardha Shalabhasana",
      "Shalabhasana",
      "Saral Dhanurasana",
      "Ardha Ustrasana",
      "Purna Ustrasana",
      "Chakrasana",
      "Makarasana",
      "Purna Dhanurasana",
      "Purna Salabasana",
      "Gupta Padmasana",
      "Purna Bhujangasana",
    ],
  },
  {
    id: "supine",
    title: "Supine Asanas",
    items: [
      "Padottanasana",
      "Supta Pawanmuktasana",
      "Kandharasana/Setu bandh",
      "Supta Udarakarshan asana",
      "Shavasana",
      "Matsyasana",
      "Supta Vajrasana",
      "Pada Angushthasana",
    ],
  },
  {
    id: "inverted",
    title: "Inverted Asanas",
    items: [
      "Vipareeta Karani Asana",
      "Sarvangasana",
      "Purva Halasana",
      "Halasana",
      "Padma Sarvangasana",
      "Shirsasana",
    ],
  },
  {
    id: "meditation",
    title: "Meditation & Pranayama",
    items: [
      "Sukhasana",
      "Padmasana",
      "Ardha padmasana",
      "Siddhasana",
      "Bhastrika (Var 1 & 2)",
      "Kapalbhati",
      "Ujjayi",
      "Vibhagiya",
      "Yogic Swasan",
      "Surya Bhedi",
      "Chandra Bhedi",
      "Surya/Chandra Anulom Viloma",
      "Nadi Shodhana",
      "Sheetali",
      "Sheetkari",
      "Bhramari",
      "Mula Bandha",
      "Uddiyana Bandha",
      "Jalandhar Bandha",
      "Jnana Mudra",
      "Chin Mudra",
      "Vishu Mudra",
      "Shanmukhi Mudra",
      "Anjali Mudra",
    ],
  },
];

export default function YogaContent() {
  const [activeTab, setActiveTab] = useState(yogaCategories[0].id);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const activeCategory = yogaCategories.find((cat) => cat.id === activeTab);

  // Reset expanded card when tab changes
  useEffect(() => {
    setExpandedCard(null);
  }, [activeTab]);

  // Get image search term based on category
  const getImageSearchTerm = (categoryId: string) => {
    const searchTerms: { [key: string]: string } = {
      warmup: "yoga stretching warmup",
      namaskara: "sun salutation yoga",
      standing: "standing yoga pose",
      balancing: "balancing yoga pose",
      sitting: "sitting yoga pose meditation",
      twisting: "yoga spinal twist",
      forward: "yoga forward bend",
      backward: "yoga backbend",
      supine: "yoga supine pose",
      inverted: "yoga inversion",
      meditation: "yoga meditation",
    };
    return searchTerms[categoryId] || "yoga pose";
  };

  return (
    <section className="pt-12 pb-20 px-8 max-w-7xl mx-auto w-full">
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
          Yoga Practices
        </h1>
        <p className="text-lg text-secondary max-w-3xl mx-auto">
          Explore our comprehensive collection of asanas and pranayamas,
          organized by category for your practice.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4 border-b-2 border-accent/30 pb-4">
          {yogaCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`
                px-6 py-3 rounded-t-lg font-medium text-sm transition-all whitespace-nowrap
                ${
                  activeTab === category.id
                    ? "bg-primary text-white shadow-lg -mb-1"
                    : "bg-accent/30 text-primary hover:bg-accent/50"
                }
              `}
            >
              {category.title.split(" ")[0]}
              {category.title.includes("(") && (
                <span className="hidden md:inline">
                  {" "}
                  {category.title.match(/\([^)]+\)/)?.[0]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Content */}
      {activeCategory && (
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            {activeCategory.title}
          </h2>

          {/* Grid of Asanas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {activeCategory.items.map((item, index) => {
              const isHighlighted = index === 0;
              const isExpanded = expandedCard === index;
              
              // Create different sizes for visual variety (only when not expanded)
              let sizeClass = "";
              let imageHeight = "h-48";
              
              if (isExpanded) {
                // Expanded card spans 2 columns and 2 rows
                sizeClass = "col-span-2 row-span-2 sm:col-span-2 lg:col-span-2 xl:col-span-2";
              } else {
                if (index % 8 === 0) {
                  // Every 8th card: tall (spans 2 rows)
                  sizeClass = "row-span-2";
                  imageHeight = "h-80";
                } else if (index % 6 === 0) {
                  // Every 6th card: wide (spans 2 columns on larger screens)
                  sizeClass = "col-span-2 sm:col-span-1 lg:col-span-2";
                  imageHeight = "h-48";
                } else if (index % 4 === 0) {
                  // Every 4th card: medium tall
                  imageHeight = "h-64";
                }
              }
              
              return (
                <div
                  key={index}
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                  className={`
                    group rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${sizeClass}
                    ${
                      isExpanded
                        ? "bg-primary text-white shadow-2xl z-50"
                        : isHighlighted
                        ? "bg-primary text-white shadow-xl scale-105"
                        : "bg-accent/30 text-primary hover:bg-primary hover:text-white hover:shadow-xl hover:scale-105"
                    }
                  `}
                >
                  {isExpanded ? (
                    // Expanded View: Image on left, Description on right
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Large Image on Left */}
                      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                        <div className="w-full h-full bg-primary/20">
                          <div className="relative w-full h-full">
                            <Image
                              src="/class-image.png"
                              alt={item}
                              fill
                              className="object-cover opacity-90"
                            />
                          </div>
                        </div>
                        {/* Close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-2 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Description on Right */}
                      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-serif font-bold text-white mb-6">
                          {item}
                        </h3>
                        <div className="space-y-4 text-white/90 leading-relaxed">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                          </p>
                          <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse 
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                            anim id est laborum.
                          </p>
                          <p>
                            This asana helps improve flexibility, strength, and mental clarity. 
                            Practice regularly to experience the full benefits of this ancient 
                            yoga posture.
                          </p>
                        </div>
                        <button className="mt-8 bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg self-start">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Normal Card View
                    <>
                      {/* Image Container */}
                      <div className={`relative ${imageHeight} w-full`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <Image
                              src="/class-image.png"
                              alt={item}
                              fill
                              className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className={`w-16 h-16 ${
                                  isHighlighted
                                    ? "text-white"
                                    : "text-primary group-hover:text-white"
                                } transition-colors`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.163L9 5.25v10.303m0 0v3.75a2.25 2.25 0 002.25 2.25h1.32l1.32-.377a1.803 1.803 0 00.99-3.467l-2.31-.66A2.25 2.25 0 009 15.553z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3
                          className={`text-lg font-bold text-center ${
                            isHighlighted
                              ? "text-white"
                              : "text-primary group-hover:text-white"
                          } transition-colors`}
                        >
                          {item}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
