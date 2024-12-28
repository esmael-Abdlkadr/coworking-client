import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl p-6 transition-all duration-300 shadow-md ${
        isOpen
          ? "bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] text-white"
          : "bg-white text-gray-800 shadow-sm"
      }`}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-xl">{question}</h3>
        {isOpen ? (
          <MdExpandLess
            size={24}
            className="text-white transition-transform duration-300"
          />
        ) : (
          <MdExpandMore
            size={24}
            className="text-[#ea580c] hover:scale-110 transition-transform duration-300"
          />
        )}
      </div>
      <div
        className={`${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-500 overflow-hidden mt-3`}
      >
        <p className="text-base leading-7">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What services do you provide?",
      answer:
        "We provide flexible coworking spaces, meeting rooms, and event spaces tailored to your needs.",
    },
    {
      question: "What are the office hours?",
      answer:
        "Our office spaces are accessible 24/7 for members. For visitors, our hours are 9 AM - 7 PM.",
    },
    {
      question: "Do you offer event hosting services?",
      answer:
        "Yes! We have versatile spaces that can host conferences, networking events, and corporate gatherings.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept online payments via credit card, bank transfers, and payment integrations like Telebirr.",
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-20 relative bg-gradient-to-b from-white via-gray-50 to-gray-200">
      <h2 className="text-center text-[#ea580c] font-extrabold text-4xl mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 max-w-lg mx-auto mb-8">
        Everything you need to know about our services and how we can help you
        succeed.
      </p>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
