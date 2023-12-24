import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB0PcnzWqvvXIuQhv6Oma51reed0qO4AJA",
  authDomain: "motion-haven.firebaseapp.com",
  projectId: "motion-haven",
  storageBucket: "motion-haven.appspot.com",
  messagingSenderId: "853728929512",
  appId: "1:853728929512:web:0bf9fece6346cb478d4b5d",
  measurementId: "G-L68GMT48LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


// what product should look like
// {
//   title: "Motion Haven Kids Sportswear",
//   images: ["image1.jpg", "image2.jpg", "image3.jpg"],
//   description: "Discover vibrant and stylish sportswear for kids at Motion Haven...",
//   price: 49.99,
//   discount: true,
//   discountedPrice: 39.99,
//   inStock: true,
//   sizesAviable: [xs , s , m , l , xl , xxl ]
//   availability: "Ships in 1-2 business days",
//   collors: ["Blue", "Red", "Green"],
//   selectedVariant: "Blue",
//   quantity: 1,
//   review: 9
//   category: "Kids Sportswear",
//   sizeGuide: "Check our size guide for the perfect fit.",
//   faqs: [
//     { question: "What is the return policy?", answer: "30-day return policy. Learn more..." },
//     { question: "How can I track my order?", answer: "Use our order tracking tool." },
//   ],
//   timeAdded: new Date(),
// }



