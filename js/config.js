/**
 * Aejis Media Fusion — Site Configuration
 * Edit values here to update the site without touching HTML or JS logic.
 */
const CONFIG = {
  // Intake form — this URL is used for every "Get Started" CTA
  formUrl: 'https://forms.gle/W2bm8ZdQxSzKfSTJ7',

  // Site identity
  siteName: 'Aejis Media Fusion',
  tagline: 'Ready-to-post AI shorts for AI creators.',

  // Pricing plans (rendered dynamically in main.js)
  plans: [
    {
      name: 'Starter',
      price: 59,
      shorts: '1 short per day (30 per month)',
      popular: false,
      features: [
        'Prompt writing',
        'AI image and clip generation',
        'Professional voiceover',
        'Captions and editing',
        '1 revision per short within 48 hours',
        'Weekly batch delivery via shared Drive folder'
      ]
    },
    {
      name: 'Growth',
      price: 109,
      shorts: '2 shorts per day (60 per month)',
      popular: true,
      features: [
        'Prompt writing',
        'AI image and clip generation',
        'Professional voiceover',
        'Captions and editing',
        '1 revision per short within 48 hours',
        'Weekly batch delivery via shared Drive folder'
      ]
    },
    {
      name: 'Pro',
      price: 149,
      shorts: '3 shorts per day (90 per month)',
      popular: false,
      features: [
        'Prompt writing',
        'AI image and clip generation',
        'Professional voiceover',
        'Captions and editing',
        '1 revision per short within 48 hours',
        'Weekly batch delivery via shared Drive folder'
      ]
    }
  ],

  // Contact — leave empty to hide the item in the footer
  contact: {
    email: 'aejismediafusion@gmail.com',
    whatsapp: 'https://wa.me/message/3DECFQ4JYH3IE1',
    tiktok: 'https://tiktok.com/@aejismediafusion',
    youtube: 'https://www.youtube.com/@Aejismediafusion',
    instagram: '',
    facebook: ''
  }
};
