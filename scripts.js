// Testimonial Carousel (Simple Rotation)
const testimonials = [
    '"Homify\'s services are top-notch! Highly recommended!" - John Doe',
    '"Amazing service and great prices!" - Jane Smith',
    '"Quick and reliable, I will definitely use Homify again!" - Mary Johnson'
];

let currentTestimonial = 0;

function showTestimonial() {
    document.querySelector('.testimonial-carousel p').textContent = testimonials[currentTestimonial];
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(showTestimonial, 3000);
