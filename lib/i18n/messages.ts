/**
 * Translation messages
 * Add translations here for i18n support
 */

export const messages = {
  en: {
    nav: {
      science: 'Science',
      pricing: 'Pricing',
      blog: 'Blog',
      community: 'Community',
      support: 'Support',
      download: 'Download',
    },
    hero: {
      title: 'Train smarter with your AI coach.',
      subtitle: 'Hyper-personalized programs, automatic progression, and live form tips. Built by lifters, backed by sports science.',
      cta: {
        ios: 'Get the iOS app',
        android: 'Join Android waitlist',
      },
    },
    footer: {
      tagline: 'Your AI fitness coach. Personalized training that adapts to you.',
      copyright: 'Buli App. Built at Aalto University.',
      reduceMotion: 'Reduce motion',
    },
  },
  fi: {
    nav: {
      science: 'Tiede',
      pricing: 'Hinnoittelu',
      blog: 'Blogi',
      community: 'Yhteisö',
      support: 'Tuki',
      download: 'Lataa',
    },
    hero: {
      title: 'Treenaa fiksummin tekoälyvalmentajan kanssa.',
      subtitle: 'Henkilökohtaiset ohjelmat, automaattinen progressio ja reaaliaikaiset tekniikkaneuvot. Tehty kuntosaliharrastajille, perustuu urheilutieteeseen.',
      cta: {
        ios: 'Lataa iOS-sovellus',
        android: 'Liity Android-jonotuslistalle',
      },
    },
    footer: {
      tagline: 'Tekoälykuntovalmentajasi. Henkilökohtainen treeni, joka mukautuu sinuun.',
      copyright: 'Buli App. Tehty Aalto-yliopistossa.',
      reduceMotion: 'Vähennä animaatioita',
    },
  },
}

export type Messages = typeof messages.en

