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
      {
        text: 'Software',
        path: '/software',
      },
      {
        text: 'Blog',
        path: '/blog',
      },
      {
        text: 'Talks',
        path: '/talks',
      },
    ]
  },
  pages: {
    home: {
      hero: {
        url: '/hero.jpg',
      },
      featuredArticles: {
        title: 'Featured Articles',
        icon: 'fa-file-text-o',
        items: ['1', '2', '3'],
        link: {
          text: 'See all articles…',
          url: '/blog',
        },
      },
      featuredProjects: {
        title: 'Software',
        icon: 'fa-laptop',
        items: ['yadda', 'rascal', 'marv', 'confabulous', 'systemic'],
        link: {
          text: 'See all software…',
          url: '/software',
        },
      },
      featuredTalks: {
        title: 'Upcoming & Recent Talks',
        icon: 'fa-microphone',
        items: ['1', '2', '3'],
        link: {
          text: 'See all talks…',
          url: '/talks',
        },
      },
    },
  },
  profile: {
    title: 'Profile',
    summary: '<p>Bacon ipsum dolor amet tri-tip ball tip tenderloin hamburger boudin venison short loin drumstick pastrami pig ham tongue brisket leberkas. Bacon tongue ham hock beef ribs andouille t-bone pastrami chuck short loin. Cow chuck short loin jowl frankfurter filet mignon doner. Landjaeger leberkas fatback hamburger jowl corned beef, meatball cow pig tongue porchetta.</p><p>Kevin shankle meatball brisket, pastrami meatloaf porchetta. Leberkas bacon ball tip andouille, picanha meatloaf meatball landjaeger hamburger beef salami pork chop biltong chicken. Burgdoggen pork belly kevin ham sausage. Corned beef ribeye doner t-bone, chicken picanha ball tip tail andouille. Frankfurter kevin chicken, pork belly tenderloin pastrami landjaeger tongue picanha. Biltong ham rump kevin strip steak pig, ribeye spare ribs chicken drumstick short ribs tail tongue. Ball tip meatball pancetta turkey burgdoggen venison biltong shankle ham hock, leberkas turducken landjaeger doner shoulder capicola.</p>',
  },
  projects: {
    'yadda': {
      id: 'yadda',
      title: 'Yadda',
      summary: 'A cucumber-esque BDD library, but with greater flexibility',
      url: 'https://www.github.com/acuminous/yadda',
      downloads: 10000,
    },
    'rascal': {
      id: 'rascal',
      title: 'Rascal',
      summary: 'A friendly RabbitMQ client, with advanced error handling and mostly safe defaults',
      url: 'https://www.github.com/guidesmiths/rascal',
      downloads: 2300,
    },
    'marv': {
      id: 'marv',
      title: 'Marv',
      summary: 'A database migration library with pluggable drivers for PostgreSQL and MySQL',
      url: 'https://www.github.com/guidesmiths/marv',
      downloads: 1100,
    },
    'confabulous': {
      id: 'confabulous',
      title: 'Confabulous',
      summary: 'A hierarchical configuration loader with support for remote sources such as S3, etcd and Vault',
      url: 'https://www.github.com/guidesmiths/confabulous',
      downloads: 1200,
    },
    'systemic': {
      id: 'systemic',
      title: 'Systemic',
      summary: 'A minimal dependency injection library',
      url: 'https://www.github.com/guidesmiths/systemic',
      downloads: 1200,
    },
  },
  talks: {
    '1': {
      id: '1',
      title: 'Bacon ipsum dolor amet bacon bresaola strip steak short',
      event: 'Corned beef meatloaf',
      summary: 'Bacon ipsum dolor amet bacon bresaola strip steak short loin pork loin landjaeger pig turducken andouille capicola pastrami sausage alcatra pork filet mignon. Spare ribs corned beef turkey ball tip rump tenderloin. Corned beef meatloaf short ribs turducken hamburger turkey landjaeger rump tenderloin tail fatback beef short loin brisket. Short loin tenderloin shoulder sausage salami fatback. Landjaeger andouille capicola shoulder pastrami pig jerky venison tail jowl beef ribs',
      date: new Date('2016-11-23T18:30:00'),
      location: 'Tenderloin',
      url: 'http://corpjs.com/event/corpjs-meetup-budapest-5/',
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        },
      },
      downloads: [],
    },
    '2': {
      id: '2',
      title: 'Andouille flank capicola drumstick alcatra ham',
      event: 'Rump fatback swine',
      summary: 'Andouille flank capicola drumstick alcatra ham hock short loin picanha shankle cow. Shank chuck swine, meatloaf ball tip brisket meatball strip steak filet mignon sausage andouille tri-tip. Pork hamburger bresaola biltong andouille pork loin pig pastrami cupim shankle picanha. Frankfurter jerky shank, boudin porchetta jowl chicken pancetta bresaola flank bacon leberkas. Ball tip filet mignon tenderloin, short loin ham spare ribs corned beef cow short ribs.',
      date: new Date('2016-07-29T19:00:00'),
      location: 'Prosciutto',
      url: 'https://www.meetup.com/Node-js-Meetup-London/events/231560165/',
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        },
      },
      downloads: [
        {
          text: 'Handouts',
          icon: 'fa-file-pdf-o',
          url: 'https://meh',
        },
      ],
    },
    '3': {
      id: '3',
      title: 'Pork loin flank',
      event: 'Landjaeger meatloaf kielbasa',
      summary: 'Pork loin flank beef ribs filet mignon pork cow pork chop t-bone turducken. Alcatra ground round pastrami boudin jowl bresaola fatback, salami pork belly picanha andouille. Spare ribs bacon andouille pork. Tri-tip bresaola shoulder t-bone.',
      date: new Date('2016-03-03T18:30:00'),
      location: 'Jowl pig',
      url: 'http://www.youtube.com/watch?v=A4INwjywGpc&t=1m58s',
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        },
      },
      downloads: [
        {
          text: 'Handouts',
          icon: 'fa-file-pdf-o',
          url: 'https://meh',
        },
      ],
    },
  },
  'articles': {
    '1': {
      id: '1',
      title: 'Bacon ipsum dolor amet bacon bresaola strip steak short',
      summary: 'Pork loin flank beef ribs filet mignon pork cow pork chop t-bone turducken. Alcatra ground round pastrami boudin jowl bresaola fatback, salami pork belly picanha andouille. Spare ribs bacon andouille pork. Tri-tip bresaola shoulder t-bone.',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        }
      }
    },
    '2': {
      id: '2',
      title: 'Andouille flank capicola drumstick alcatra ham',
      summary: 'Andouille flank capicola drumstick alcatra ham hock short loin picanha shankle cow. Shank chuck swine, meatloaf ball tip brisket meatball strip steak filet mignon sausage andouille tri-tip. Pork hamburger bresaola biltong andouille pork loin pig pastrami cupim shankle picanha. Frankfurter jerky shank, boudin porchetta jowl chicken pancetta bresaola flank bacon leberkas. Ball tip filet mignon tenderloin, short loin ham spare ribs corned beef cow short ribs.',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        }
      }
    },
    '3': {
      id: '3',
      title: 'Pork loin flank',
      summary: 'Bacon ipsum dolor amet bacon bresaola strip steak short loin pork loin landjaeger pig turducken andouille capicola pastrami sausage alcatra pork filet mignon. Spare ribs corned beef turkey ball tip rump tenderloin. Corned beef meatloaf short ribs turducken hamburger turkey landjaeger rump tenderloin tail fatback beef short loin brisket. Short loin tenderloin shoulder sausage salami fatback. Landjaeger andouille capicola shoulder pastrami pig jerky venison tail jowl beef ribs',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png'
        }
      }
    },
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
          }
        ]
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
          {
            text: 'Cookie Policy',
            url: '/legal/cookie-policy',
          },
        ]
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
            url: 'https://www.linkedin.com/stephen-cresswell',
          }
        ]
      },
    ]
  }
}
