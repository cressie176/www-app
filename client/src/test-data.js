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
      // {
      //   text: 'Blog',
      //   path: '/blog',
      // },
      // {
      //   text: 'Talks',
      //   path: '/talks',
      // },
    ],
  },
  pages: {
    home: {
      hero: {
        url: '/hero.jpg',
      },
      featuredArticles: {
        title: 'Featured Articles',
        icon: 'fa-file-text-o',
        items: ['1', '2', '3',],
        link: {
          text: 'See all articles…',
          url: '/blog',
        },
      },
      featuredProjects: {
        title: 'Software',
        icon: 'fa-laptop',
        items: ['yadda', 'rascal', 'marv', 'confabulous', 'systemic',],
        link: {
          text: 'See all software…',
          url: '/software',
        },
      },
      featuredTalks: {
        title: 'Recent & Upcoming Talks',
        icon: 'fa-microphone',
        items: ['1', '2', '3',],
        link: {
          text: 'See all talks…',
          url: '/talks',
        },
      },
    },
  },
  profile: {
    title: 'Profile',
    summary: [
      '<p>I am a creative and conscientious software engineer with over 20 years experience in a variety of sectors. While most productive designing and writing backend systems, I am accomplished at leading cross functional teams and have extensive DevOps experience, especially with regards to CI/CD pipelines and containerisation. I also have reasonable frontend skills which include React, as demonstrated by the <a href="https://www.github.com/cressie176/www-app">source code</a> for this site.</p>',
      '<p>I am currently operating in a dual role, firstly as CTO and co-founder of <a href="https://www.guidesmiths.com">GuideSmiths</a>, a successful Node.js/Microservices consultancy, secondly as principal consultant, leading technical teams designing and implementing solutions for GuideSmith’s clients.</p>',
      '<p>Between a young family (my wife and I have a 9 year old daughter, and 6 year old son), growing a successful business, and publishing around 60 open source libraries in the last four years, I have had limited time for hobbies. Even so I still find time to regularly practice Muay Thai and occasionally Brazilian jiu-jitsu.</p>',
    ].join(''),
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
      title: 'Yadda - The other JavaScript BDD library',
      summary: [
        '<p>The JavaScript community has got rather confused about BDD. The most popular tools, Jasmine, Mocha, Vows, Chai and Expect are proclaimed as BDD, but they\'re not. Jasmine, Mocha and Vows, are excellent test frameworks, but from a BDD perspective they merely describe(\'some test function\') with text. Chai and Expect don\'t even do this, they are fluid assertion apis, which attempt to simulate an ordinary language a.bit.like.this().</p>',
        '<p>The only true BDD tool found during my search was CucumberJS. The problem with CucumberJS is that the Gerkin syntax is restrictive. I don\'t want to be limited to starting my sentences with Given, When, Then, And and But.</p>',
        '<p>I want to express myself naturally. I also want a test runner makes good decisions about which steps to run, instead of picking the first matching one it comes to. I want a tool that doesn\'t fail silently.  I want a tool that I can use synchronously or asynchronously and run in a browser. I want a tool that lets me plugin different step libraries so that I can test multiple interfaces (e.g. rest and HTML) with the same scenarios. I even want a tool that has nothing to do with testing and just maps ordinary sentences to functions so I could use it in a rules engine or build script.</p>',
        '<p>That\'s why I wrote <a href=\'http://www.github.com/acuminous/yadda\'>Yadda</a> - the other JavaScript BDD library.</p>',
      ].join(''),
      event: 'ASOS',
      date: '1st June 2017',
      location: 'London',
      url: 'https://www.evensi.uk/yadda-yadda-yadda-asos-hq-asos-/211294453',
      images: {
        thumbnail: {
          url: '/images/yadda.jpg',
        },
      },
      downloads: [],
    },
    '2': {
      id: '2',
      title: 'Enterprise Grade Microservices',
      event: 'Corp.js',
      summary: [
        '<p>Microservice adoption is driven by promises of simplicity, flexibility, resilience and productivity. It liberates developers from clunky frameworks and legacy technology, enabling them to release faster and more frequently than ever before. With an effective deployment pipeline it is possible to have a new microservice running in production and delivering value within 15 minutes, and to achieve 20+ production releases a day.</p>',
        '<p>But the fast pace, technological freedom and segregated codebase is not without cost. The maxim that a microservice codebase doesn\'t matter because it\'s small, won\'t change and is easily replaced is more often false than it is true. The principles behind clean code and 12 factor apps are just as applicable to microservices as they are to monoliths, but are all too easily forgotten.</p>',
      ].join(''),
      url: 'https://www.meetup.com/Corporate-JavaScript-Meetup-Budapest/',
      location: 'Budapest',
      date: '23rd November 2016',
      images: {
        thumbnail: {
          url: '/images/enterprise-grade-microservices.jpg',
        },
      },
      downloads: [],
    },
    '3': {
      id: '3',
      title: 'Divorcing Microservices With Rascal',
      event: 'Node.js Meetup',
      summary: [
        '<p>Microservice based architectures are everywhere, but to succeed you must find ways to decouple your services so they can be developed and deployed in isolation. A popular strategy is to use a message broker, which in addition to providing the decoupling, can also add robustness and scalability. But messaging can be deceptively difficult. Which broker suits your needs best? Should you follow a "command" or "event" based model? How will you handle duplicates? Can you tolerate message loss? Will you recover from errors by discarding, retrying or dead lettering?</p>',
        '<p>If these questions weren\'t enough, you have to find a good client library. For RabbitMQ there\'s the excellent <a href="https://github.com/squaremo/amqp.node">ampqlib</a>, but it\'s not for the faint of heart. Estabilishing a communication channel with the broker requires serveral api calls, and will not be automatically be restablished if dropped. Messages are not persistent or confirmed by default. Errors are likely to crash your application, and there\'s no support for clustering.</p>',
        '<p>Enter <a href="https://www.github.com/guidesmiths/rascal">Rascal</a>, a friendly, config driven RabbitMQ client which sits on top of amqplib, simplyfing adoption significantly.</p>',
      ].join(''),
      date: '29th June 2016',
      location: 'London',
      url: 'https://www.meetup.com/Node-js-Meetup-London/events/231560165/',
      images: {
        thumbnail: {
          url: '/images/divorcing-microservices-with-rascal.jpg',
        },
      },
      downloads: [],
    },
  },
  'articles': {
    '1': {
      id: '1',
      url: 'https://www.stephen-cresswell.net/blog/bacon-ipsum-dolor-amet-bacon-bresaola-strip-steak-short-1',
      title: 'Bacon ipsum dolor amet bacon bresaola strip steak short',
      summary: 'Pork loin flank beef ribs filet mignon pork cow pork chop t-bone turducken. Alcatra ground round pastrami boudin jowl bresaola fatback, salami pork belly picanha andouille. Spare ribs bacon andouille pork. Tri-tip bresaola shoulder t-bone.',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png',
        },
      },
    },
    '2': {
      id: '2',
      url: 'https://www.stephen-cresswell.net/blog/andouille-flank-capicola-drumstick-alcatra-ham-2',
      title: 'Andouille flank capicola drumstick alcatra ham',
      summary: 'Andouille flank capicola drumstick alcatra ham hock short loin picanha shankle cow. Shank chuck swine, meatloaf ball tip brisket meatball strip steak filet mignon sausage andouille tri-tip. Pork hamburger bresaola biltong andouille pork loin pig pastrami cupim shankle picanha. Frankfurter jerky shank, boudin porchetta jowl chicken pancetta bresaola flank bacon leberkas. Ball tip filet mignon tenderloin, short loin ham spare ribs corned beef cow short ribs.',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png',
        },
      },
    },
    '3': {
      id: '3',
      url: 'https://www.stephen-cresswell.net/blog/porkploinpflank-3',
      title: 'Pork loin flank',
      summary: 'Bacon ipsum dolor amet bacon bresaola strip steak short loin pork loin landjaeger pig turducken andouille capicola pastrami sausage alcatra pork filet mignon. Spare ribs corned beef turkey ball tip rump tenderloin. Corned beef meatloaf short ribs turducken hamburger turkey landjaeger rump tenderloin tail fatback beef short loin brisket. Short loin tenderloin shoulder sausage salami fatback. Landjaeger andouille capicola shoulder pastrami pig jerky venison tail jowl beef ribs',
      date: new Date('2016-07-29T19:00:00'),
      images: {
        thumbnail: {
          url: '/placeholder-360x240.png',
        },
      },
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
            url: 'https://www.linkedin.com/stephen-cresswell',
          },
          {
            icon: 'fa-twitter',
            url: 'https://www.twitter.com/cressie176',
          },
        ],
      },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    html: '<p>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</p><p>The term "us" or "we" refers to the owner of the website. The term "you" refers to the user or viewer of our website.</p><p>The use of this website is subject to the following terms of use:<ol><li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li><li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the personal information may be stored by us for use by third parties.</li><li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li><li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li><li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li><li>All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</li><li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</li><li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li><li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Northern Ireland, Scotland and Wales.</li></ol></p>',
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    html: '<p>This privacy policy sets out how we use and protect any information that you give us when you use this website.</p><p>We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.</p><p>We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 1st August 2017.</p><h3>What we collect</h3><p>This website does not ask for or collect personal information.</p><h3>How we use cookies</h3><p>A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p><p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p><p>Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p><p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p><h3>Links to other websites</h3><p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>',
  },
};
