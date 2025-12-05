import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaGithub,
  FaSpotify,
  FaTwitch,
  FaDiscord,
  FaTelegram,
  FaWhatsapp,
  FaPinterest,
  FaSnapchat,
  FaMedium,
  FaReddit,
  FaGlobe,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IconType } from 'react-icons'

interface SocialMedia {
  name: string
  icon: IconType
  color: string
  pattern: RegExp
}

const socialMediaList: SocialMedia[] = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    color: '#E4405F',
    pattern: /instagram\.com/i,
  },
  {
    name: 'Twitter/X',
    icon: FaXTwitter,
    color: '#000000',
    pattern: /(twitter\.com|x\.com)/i,
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    color: '#1877F2',
    pattern: /(facebook\.com|fb\.com)/i,
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    color: '#FF0000',
    pattern: /(youtube\.com|youtu\.be)/i,
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    color: '#0A66C2',
    pattern: /linkedin\.com/i,
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    color: '#000000',
    pattern: /tiktok\.com/i,
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    color: '#181717',
    pattern: /github\.com/i,
  },
  {
    name: 'Spotify',
    icon: FaSpotify,
    color: '#1DB954',
    pattern: /(spotify\.com|open\.spotify\.com)/i,
  },
  {
    name: 'Twitch',
    icon: FaTwitch,
    color: '#9146FF',
    pattern: /twitch\.tv/i,
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    color: '#5865F2',
    pattern: /(discord\.gg|discord\.com)/i,
  },
  {
    name: 'Telegram',
    icon: FaTelegram,
    color: '#26A5E4',
    pattern: /(t\.me|telegram\.me)/i,
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366',
    pattern: /(wa\.me|whatsapp\.com)/i,
  },
  {
    name: 'Pinterest',
    icon: FaPinterest,
    color: '#E60023',
    pattern: /pinterest\.com/i,
  },
  {
    name: 'Snapchat',
    icon: FaSnapchat,
    color: '#FFFC00',
    pattern: /snapchat\.com/i,
  },
  {
    name: 'Medium',
    icon: FaMedium,
    color: '#000000',
    pattern: /medium\.com/i,
  },
  {
    name: 'Reddit',
    icon: FaReddit,
    color: '#FF4500',
    pattern: /reddit\.com/i,
  },
]

export function detectSocialMedia(url: string): {
  icon: IconType
  color: string
  name: string
} | null {
  for (const social of socialMediaList) {
    if (social.pattern.test(url)) {
      return {
        icon: social.icon,
        color: social.color,
        name: social.name,
      }
    }
  }
  return null
}

export function getSocialIcon(url: string): IconType {
  const detected = detectSocialMedia(url)
  return detected ? detected.icon : FaGlobe
}

export function getSocialColor(url: string): string {
  const detected = detectSocialMedia(url)
  return detected ? detected.color : '#6B7280'
}
