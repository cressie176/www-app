module.exports = {
  copyright: {
    year: '2017',
    owner: 'Stephen Cresswell',
    rights: 'All rights reserved.',
  },
  navigation: {
    items: [
      {
        text: 'Home',
        path: '/',
        active: true,
      },
      // Disabled for MVP
      // {
      //   text: 'Software',
      //   path: '/software',
      // },
      {
        text: 'Blog',
        path: '/blog',
      },
      {
        text: 'Talks',
        path: '/talks',
      },
    ],
  },
  footer: {
    spotlights: [
      {
        title: 'Contact',
        type: 'contact',
        links: [
          {
            icon: 'fa-envelope',
            text: 'hello@stephen-cresswell.net',
            url: 'mailto:hello@stephen-cresswell.net',
          },
          {
            icon: 'fa-phone',
            text: '+44 (0)7814 033321',
            url: 'tel:+447814033321',
          },
        ],
      },
      {
        title: 'Legal',
        type: 'legal',
        links: [
          {
            text: 'Terms & Conditions',
            url: '/legal/terms-and-conditions',
          },
          {
            text: 'Privacy Policy',
            url: '/legal/privacy-policy',
          },
        ],
      },
      {
        title: 'Social Networks',
        type: 'social',
        links: [
          {
            icon: 'fa-github',
            url: 'https://www.github.com/cressie176/',
          },
          {
            icon: 'fa-linkedin',
            url: 'https://www.linkedin.com/in/stephencresswell/',
          },
          {
            icon: 'fa-twitter',
            url: 'https://www.twitter.com/cressie176',
          },
        ],
      },
    ],
  },
};
