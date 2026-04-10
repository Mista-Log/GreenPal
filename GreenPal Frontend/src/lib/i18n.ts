import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "scan": "Scan",
        "forecast": "Forecast",
        "tips": "Tips",
        "you": "You"
      },
      "profile": {
        "hi": "Hi, {{name}}!",
        "settings": "Account settings",
        "data": "Your data",
        "help": "Help",
        "feedback": "Feedback",
        "signout": "Sign out"
      },
      "settings": {
        "title": "Account settings",
        "personal": "Personal Info",
        "name": "Name",
        "email": "Email",
        "save": "Save",
        "language_region": "Language and Region",
        "region": "Region",
        "state": "State",
        "lga": "Local Government",
        "notifications": "Notifications",
        "push": "Push notifications",
        "email_notif": "Email notifications",
        "weather": "Weather alerts",
        "crops": "Crop reminders",
        "appearance": "Appearance",
        "theme": "Theme",
        "system": "System Default",
        "light": "Light Mode",
        "dark": "Dark Mode",
        "theme_desc": "Selecting System Default will try to automatically sync the theme with your mobile or desktop settings.",
        "security": "Security settings",
        "two_factor": "Two-factor authentication",
        "two_factor_desc": "Add an extra layer of security",
        "change_password": "Change password"
      },
      "voice": {
        "trying": "Try saying something",
        "failed": "Didn't catch that. Try speaking again.",
        "retry": "Try again",
        "listening": "Listening in {{language}}..."
      },
      "home": {
        "weather_desc": "{{location}} · {{condition}}",
        "weather_conditions": {
          "sunny": "Sunny",
          "rainy": "Rainy",
          "cloudy": "Cloudy",
          "stormy": "Stormy"
        },
        "scan": "Scan",
        "forecast": "Forecast",
        "quick_access": "Quick Access",
        "recent_activity": "Recent Activity",
        "activity_types": {
          "scan": "Scan",
          "tip": "Tip",
          "question": "Question"
        },
        "confidence": "{{value}}% confidence"
      },
      "tips": {
        "featured": "Featured",
        "personalized_title": "Get tips picked just for you",
        "personalized_desc": "Keep it fresh with daily recommendations from the Greenpal Collection.",
        "get_started": "Get started",
        "results": "{{count}} results",
        "all": "All",
        "no_results": "No results for this category",
        "no_results_desc": "We don't have tips for \"{{category}}\" yet, but we're constantly adding more.",
        "show_all": "Show all tips",
        "see_all": "See all",
        "min": "{{count}} min",
        "categories": {
          "soil_care": "Soil Care",
          "crop_planting": "Crop Planting",
          "irrigation": "Irrigation",
          "pest_control": "Pest Control",
          "weed_control": "Weed Control",
          "fertilizers": "Fertilizers",
          "composting": "Composting",
          "crop_rotation": "Crop Rotation",
          "harvesting": "Harvesting",
          "organic_farming": "Organic Farming"
        }
      },
      "you": {
        "joined": "Joined {{year}} · {{email}}",
        "edit_profile": "Edit Profile",
        "community": "Community",
        "community_items": {
          "knowledge": "Knowledge Sharing",
          "collaboration": "Farmer Collaboration",
          "market": "Local Market Updates",
          "support": "Community Support",
          "discussions": "Farm Discussions"
        },
        "growth_targets": "Goals",
        "growth_targets_status": "{{active}} active • {{completed}} completed",
        "no_goals": "No goals set",
        "no_goals_desc": "Check back later for new goals tailored to your farm.",
        "badges": "Badges & Achievements",
        "goal_title": "Goal Title",
        "goal_subtitle": "Goal Subtitle",
        "categories": {
          "crops": "Crops",
          "livestock": "Livestock",
          "soil_health": "Soil Health",
          "business": "Business"
        }
      },
      "search": {
        "placeholder": "Search crops, weather...",
        "recent": "Recent",
        "search_for": "Search for \"{{query}}\"",
        "recent_items": {
          "tomato_blight": "Tomato blight treatment",
          "rainfall_forecast": "Rainfall forecast for this week",
          "npk_ratio": "NPK fertilizer ratio"
        }
      },
      "actions": {
        "chat": "Chat",
        "voice": "Voice",
        "tips": "Tips",
        "history": "History",
        "bookmarks": "Bookmarks"
      },
      "scan": {
        "title": "Plant Diagnosis",
        "instructions": {
          "ready": "Center the leaf in the frame",
          "low_light": "More light needed",
          "too_far": "Move closer to leaf",
          "analyzing": "Analyzing plant health..."
        },
        "viewfinder": {
          "capture": "Scan",
          "gallery": "Gallery",
          "flash_on": "Flash On",
          "flash_off": "Flash Off"
        },
        "results": {
          "title": "Analysis Result",
          "severity": {
            "title": "Severity",
            "low": "Healthy / Mild",
            "medium": "Warning / Moderate",
            "high": "Critical / High Risk"
          },
          "tabs": {
            "diagnosis": "Diagnosis",
            "treatment": "Treatment",
            "prevention": "Prevention"
          },
          "sections": {
            "symptoms": "Detected Symptoms",
            "organic": "Organic Treatment",
            "chemical": "Chemical Options",
            "prevention_tips": "Prevention Guide"
          },
          "read_aloud": "Read Aloud",
          "stop": "Stop"
        },
        "errors": {
          "camera": "Camera permission denied",
          "api": "Unable to connect to NVIDIA Cloud",
          "json": "Diagnosis result format error"
        }
      },
      "weather": {
        "title": "Weather Forecast",
        "advisory": "AI Advisory",
        "weekly_view": "7-Day Forecast",
        "details": {
          "humidity": "Humidity",
          "wind": "Wind Speed",
          "precip": "Precipitation",
          "feels_like": "Feels like",
          "sunrise": "Sunrise",
          "sunset": "Sunset"
        },
        "units": {
          "temp": "°C",
          "speed": "km/h",
          "percentage": "%"
        },
        "status": {
          "loading": "Fetching live forecast...",
          "analyzing": "Generating agricultural advice...",
          "error": "Weather data unavailable"
        }
      }
    }
  },
  ha: {
    translation: {
      "nav": { "home": "Gida", "scan": "Duba", "forecast": "Hasashen yanayi", "tips": "Shawarwari", "you": "Kai" },
      "search": {
        "placeholder": "Nemi amfanin gona, yanayi...",
        "recent": "Na baya-bayan nan",
        "search_for": "Nemi \"{{query}}\"",
        "recent_items": {
          "tomato_blight": "Maganin cutar tumatir",
          "rainfall_forecast": "Hasashen ruwan sama na wannan makon",
          "npk_ratio": "Rabon takin NPK"
        }
      },
      "profile": { "hi": "Sannu, {{name}}!", "settings": "Saitunan asusu", "signout": "Fita" },
      "settings": {
        "title": "Saitunan asusu",
        "personal": "Bayanin Kai",
        "name": "Suna",
        "email": "Imel",
        "save": "Ajiye",
        "language_region": "Harshe da Yanki",
        "state": "Jiha",
        "lga": "Haramar Hukuma",
        "notifications": "Sanarwa",
        "push": "Sanarwar tura sako",
        "email_notif": "Sanarwar Imel",
        "weather": "Gargaɗin yanayi",
        "crops": "Tuna amfanin gona",
        "appearance": "Kamanni",
        "theme": "Jigo",
        "system": "Tsohowar tsarin",
        "light": "Haske",
        "dark": "Duhu",
        "theme_desc": "Zaɓar Tsohowar tsarin zai yi ƙoƙarin daidaita jigo ta atomatik tare da saitunan wayarku ko kwamfutarku.",
        "security": "Saitunan tsaro",
        "two_factor": "Tabbatarwa mataki biyu",
        "two_factor_desc": "Ƙara ƙarin kariya",
        "change_password": "Canza kalmar sirri"
      },
      "voice": {
        "trying": "Gwada faɗar wani abu",
        "failed": "Ban ji ba. Sake gwadawa.",
        "retry": "Sake gwadawa",
        "listening": "Sauraro a {{language}}..."
      },
      "home": {
        "weather_desc": "{{location}} · {{condition}}",
        "weather_conditions": {
          "sunny": "Sunny",
          "rainy": "Rainy",
          "cloudy": "Cloudy",
          "stormy": "Stormy"
        },
        "scan": "Duba",
        "forecast": "Hasashen yanayi",
        "quick_access": "Shiga cikin sauri",
        "recent_activity": "Ayyukan baya-bayan nan",
        "activity_types": {
          "scan": "Duba",
          "tip": "Shawarwari",
          "question": "Tambaya"
        },
        "confidence": "{{value}}% tabbas"
      },
      "tips": {
        "featured": "Fitattu",
        "personalized_title": "Samu shawarwari kawai gare ku",
        "personalized_desc": "Kasance tare da sabuntawa ta yau da kullun daga Tarin Greenpal.",
        "get_started": "Fara yanzu",
        "results": "{{count}} sakamako",
        "all": "Duka",
        "no_results": "Babu sakamako ga wannan rukunin",
        "no_results_desc": "Ba mu da shawarwari ga \"{{category}}\" tukunna, amma muna ƙara ƙarin akai-akai.",
        "show_all": "Nuna duk shawarwari",
        "see_all": "Duba duka",
        "min": "minti {{count}}",
        "categories": {
          "soil_care": "Kula da Kasa",
          "crop_planting": "Shuka Amfanin Gona",
          "irrigation": "Ban Ruwa",
          "pest_control": "Kula da Kwari",
          "weed_control": "Kula da Ciyawa",
          "fertilizers": "Taki",
          "composting": "Taki na Gargajiya",
          "crop_rotation": "Juya Shuka",
          "harvesting": "Girbi",
          "organic_farming": "Noma na Halitta"
        }
      },
      "you": {
        "joined": "An shiga {{year}} · {{email}}",
        "edit_profile": "Gyara bayanan martaba",
        "community": "Al'umma",
        "community_items": {
          "knowledge": "Raba Ilimi",
          "collaboration": "Hadin Gwiwar Manoma",
          "market": "Sabuntawar Kasuwar Gida",
          "support": "Taimakon Al'umma",
          "discussions": "Tattaunawar Gona"
        },
        "growth_targets": "Goals",
        "growth_targets_status": "{{active}} masu aiki • {{completed}} an kammala",
        "no_goals": "Babu burin girma da aka saita",
        "no_goals_desc": "Duba can gaba don sabbin targets na gona naka.",
        "badges": "Bajoji & Nasarori",
        "goal_title": "Sumbul na Manufofin",
        "goal_subtitle": "Sumbul na Manufofin",
        "categories": {
          "crops": "Amfanin Gona",
          "livestock": "Dabbobi",
          "soil_health": "Lafiyar Kasa",
          "business": "Kasuwanci"
        }
      },
      "actions": {
        "chat": "Hira",
        "voice": "Muryar",
        "tips": "Shawarwari",
        "history": "Tarihi",
        "bookmarks": "Alamu"
      },
      "scan": {
        "title": "Gano Cuta",
        "instructions": {
          "ready": "Saka ganyen a tsakiya",
          "low_light": "Ana bukatar karin haske",
          "too_far": "Matsa kusa da ganyen",
          "analyzing": "Ana duba lafiyar shuka..."
        },
        "viewfinder": {
          "capture": "Duba",
          "gallery": "Hoto",
          "flash_on": "Haske a kunne",
          "flash_off": "Haske a kashe"
        },
        "results": {
          "title": "Sakamakon Dubawa",
          "severity": {
            "title": "Tsananin Cuta",
            "low": "Lafiyayye / Kadai",
            "medium": "Gargaɗi / Matsakaici",
            "high": "Hadari / Sosai"
          },
          "tabs": {
            "diagnosis": "Bincike",
            "treatment": "Magani",
            "prevention": "Kariya"
          },
          "sections": {
            "symptoms": "Alamomin da aka gani",
            "organic": "Maganin Gargajiya",
            "chemical": "Maganin Zamani",
            "prevention_tips": "Jagorar Kariya"
          },
          "read_aloud": "Saurari Bayani",
          "stop": "Dakatar"
        },
        "errors": {
          "camera": "An hana izinin kyamara",
          "api": "Ba a iya hadawa da NVIDIA Cloud ba",
          "json": "Kuskuren tsarin sakamako"
        }
      },
      "weather": {
        "title": "Hasashen Yanayi",
        "advisory": "Shawara Daga AI",
        "weekly_view": "Hasashen Kwana 7",
        "details": {
          "humidity": "Danshi",
          "wind": "Gudun Iska",
          "precip": "Ruwan Sama",
          "feels_like": "Yanayin Jiki",
          "sunrise": "Fitowar Rana",
          "sunset": "Faduwar Rana"
        },
        "units": {
          "temp": "°C",
          "speed": "km/h",
          "percentage": "%"
        },
        "status": {
          "loading": "Ana dauko labarin yanayi...",
          "analyzing": "Ana samar da shawarar noma...",
          "error": "Ba a sami labarin yanayi ba"
        }
      }
    }
  },
  yo: {
    translation: {
      "nav": { "home": "Ile", "scan": "Ìwádìí", "forecast": "Àsọtẹ́lẹ̀ ojú ọjọ́", "tips": "Àmọ̀ràn", "you": "Iwọ" },
      "search": {
        "placeholder": "Wá ohun ọ̀gbìn, ojú ọjọ́...",
        "recent": "Dídùn mọni",
        "search_for": "Wá fun \"{{query}}\"",
        "recent_items": {
          "tomato_blight": "Itoju kokoro tomati",
          "rainfall_forecast": "Asọtẹlẹ ojo fun ọsẹ yii",
          "npk_ratio": "Ipin ajile NPK"
        }
      },
      "profile": { "hi": "Pẹlẹ o, {{name}}!", "settings": "Ètò àkàǹtì", "signout": "Jáde" },
      "settings": {
        "title": "Ètò àkàǹtì",
        "personal": "Ìsọfúnni Ara Ẹni",
        "name": "Orukọ",
        "email": "Imeeli",
        "save": "Fipamọ",
        "language_region": "Èdè àti Agbègbè",
        "state": "Ìpínlẹ̀",
        "lga": "Ìjọba Ìbílẹ̀",
        "notifications": "Ìwifúnni",
        "push": "Ìwifúnni tì nkan",
        "email_notif": "Ìwifúnni imeeli",
        "weather": "Ìkìlọ̀ ojú ọjọ́",
        "crops": "Ìrántí ohun ọ̀gbìn",
        "appearance": "Irísí",
        "theme": "Àwọ̀",
        "system": "Ti kọmputa",
        "light": "Ìmọ́lẹ̀",
        "dark": "Òkunkun",
        "theme_desc": "Yiyan Ti kọmputa yoo gbiyanju lati mu àwọ̀ rẹ mu ni aifọwọyi pẹlu awọn eto alagbeka tabi kọmputa rẹ.",
        "security": "Awọn eto aabo",
        "two_factor": "Idanimọ igbesẹ meji",
        "two_factor_desc": "Fi afikun aabo kun",
        "change_password": "Yi ọrọ igbaniwọle pada"
      },
      "voice": {
        "trying": "Gbiyanju lati sọ nkan",
        "failed": "Mi o gbọ iyẹn. Tún sọ.",
        "retry": "Tún gbiyanju",
        "listening": "Ngbo ni {{language}}..."
      },
      "home": {
        "weather_desc": "{{location}} · {{condition}}",
        "weather_conditions": {
          "sunny": "Oorùn",
          "rainy": "Òjò",
          "cloudy": "Kuukù",
          "stormy": "Ìjì"
        },
        "scan": "Ìwádìí",
        "forecast": "Àsọtẹ́lẹ̀ ojú ọjọ́",
        "quick_access": "Agbègbè ìyára",
        "recent_activity": "Ìgbòkègbodò láìpẹ́",
        "activity_types": {
          "scan": "Ayẹwo",
          "tip": "Àmọ̀ràn",
          "question": "Ìbéèrè"
        },
        "confidence": "{{value}}% ìdánilójú"
      },
      "tips": {
        "featured": "Gbajúmọ̀",
        "personalized_title": "Gba awọn àmọ̀ràn ti o yẹ fun ọ",
        "personalized_desc": "Muu rẹ rirọ pẹlu awọn iṣeduro ojoumọ lati Greenpal Collection.",
        "get_started": "Bẹ̀rẹ̀",
        "results": "{{count}} àbájáde",
        "all": "Gbogbo rẹ̀",
        "no_results": "Ko si àbájáde fun ẹka yii",
        "no_results_desc": "A ko ni awọn àmọ̀ràn fun \"{{category}}\" sibẹsibẹ, ṣugbann a n ṣafikun diẹ sii nigbagbogbo.",
        "show_all": "Fi gbogbo awọn àmọ̀ràn han",
        "see_all": "Wo gbogbo rẹ̀",
        "min": "ìṣẹ́jú {{count}}",
        "categories": {
          "soil_care": "Ìtọ́jú Ilẹ̀",
          "crop_planting": "Gbígbin Ohun Ọ̀gbìn",
          "irrigation": "Ìbomirin",
          "pest_control": "Ìṣòna Kòkòrò",
          "weed_control": "Ìtọ́jú Igbó",
          "fertilizers": "Ajílẹ̀",
          "composting": "Mímú Ajílẹ̀",
          "crop_rotation": "Yíyí Ohun Ọ̀gbìn Padà",
          "harvesting": "Ìkórè",
          "organic_farming": "Ìṣẹ́ Òmìnira"
        }
      },
      "you": {
        "joined": "Darapọ mọ {{year}} · {{email}}",
        "edit_profile": "Ṣatunkọ Profaili",
        "community": "Agbègbè",
        "community_items": {
          "knowledge": "Pínpín Ìmọ̀",
          "collaboration": "Ìfowósowọ́pọ̀ Àwọn Àgbẹ̀",
          "market": "Ìròyìn Ọjà Ìbílẹ̀",
          "support": "Ìtìlẹ́yìn Agbègbè",
          "discussions": "Ìjíròrò Ohun Ọ̀gbìn"
        },
        "growth_targets": "Awọn Àfojúsùn",
        "growth_targets_status": "{{active}} nṣiṣẹ • {{completed}} ti pari",
        "no_goals": "Ko si awọn ibi-afẹde idagbasoke ti a ṣeto",
        "no_goals_desc": "Ṣayẹwo nigbamii for awọn ibi-afẹde iṣẹ tuntun ti o baamu fun oko rẹ.",
        "badges": "Awọn ami-ẹri & Awọn aṣeyọri",
        "goal_title": "Àkọlé Àfojúsùn",
        "goal_subtitle": "Àkọlé Kékeré Àfojúsùn",
        "categories": {
          "crops": "Ohun Ọ̀gbìn",
          "livestock": "Ẹran Ọ̀sìn",
          "soil_health": "Ìlera Ilẹ̀",
          "business": "Iṣẹ́ Ajé"
        }
      },
      "actions": {
        "chat": "Soro",
        "voice": "Ohùn",
        "tips": "Àmọ̀ràn",
        "history": "Ìtàn",
        "bookmarks": "Àmì ìtọ́kasí"
      },
      "scan": {
        "title": "Ìwadii Àrùn Ọ̀gbìn",
        "instructions": {
          "ready": "Fi ewé sí àárín",
          "low_light": "Ìmọ́lẹ̀ kò tó",
          "too_far": "Súnmọ́ ewé náà",
          "analyzing": "À n wo ìlera ọ̀gbìn..."
        },
        "viewfinder": {
          "capture": "Yàá",
          "gallery": "Àwòrán",
          "flash_on": "Iná tàn",
          "flash_off": "Iná kúrò"
        },
        "results": {
          "title": "Àbájáde Ìwádìí",
          "severity": {
            "title": "Ipele Àrùn",
            "low": "Dára / Kéré",
            "medium": "Ìkìlọ̀ / Àárín",
            "high": "Ewu / Púpọ̀"
          },
          "tabs": {
            "diagnosis": "Ìwádìí",
            "treatment": "Ìtọ́jú",
            "prevention": "Ìdènà"
          },
          "sections": {
            "symptoms": "Àwọn Àmì tí a rí",
            "organic": "Ìtọ́jú Àdábá",
            "chemical": "Ìtọ́jú Òyìnbó",
            "prevention_tips": "Ìtọ́sọ́nà Ìdènà"
          },
          "read_aloud": "Gbọ́ Àlàyé",
          "stop": "Dúró"
        },
        "errors": {
          "camera": "A kò gba àyè fún kámẹ́rà",
          "api": "Kò lè so pọ̀ mọ́ NVIDIA Cloud",
          "json": "Àṣìṣe wà nínú àbájáde"
        }
      },
      "weather": {
        "title": "Asotele Oju-ojo",
        "advisory": "Imoran AI",
        "weekly_view": "Asotele Ojo meje",
        "details": {
          "humidity": "Oru",
          "wind": "Iyara Ategun",
          "precip": "Iye Ojo",
          "feels_like": "Bi o se n se ara",
          "sunrise": "Iyo Oon",
          "sunset": "Iwo Oon"
        },
        "units": {
          "temp": "°C",
          "speed": "km/h",
          "percentage": "%"
        },
        "status": {
          "loading": "A n gba asotele oju-ojo...",
          "analyzing": "A n mura imoran ogbin...",
          "error": "Asotele oju-ojo ko si"
        }
      }
    }
  },
  ig: {
    translation: {
      "nav": { "home": "Ụlọ", "scan": "Nyocha", "forecast": "Amụma ihu igwe", "tips": "Ndụmọdụ", "you": "Gị" },
      "search": {
        "placeholder": "Chọọ ihe ọkụkụ, ihu igwe...",
        "recent": "Ihe mere nso",
        "search_for": "Chọọ maka \"{{query}}\"",
        "recent_items": {
          "tomato_blight": "Ọgwụ tomato blight",
          "rainfall_forecast": "Amụma mmiri ozuzo maka izu a",
          "npk_ratio": "Npụta fatịlaịza NPK"
        }
      },
      "profile": { "hi": "Nnọọ, {{name}}!", "settings": "Ntọala akaụntụ", "signout": "Pụọ" },
      "settings": {
        "title": "Ntọala akaụntụ",
        "personal": "Ozi Onwe Gị",
        "name": "Aha",
        "email": "Imeel",
        "save": "Chekwaa",
        "language_region": "Asụsụ na mpaghara",
        "state": "Steeti",
        "lga": "Gọọmenti Obodo",
        "notifications": "Ịma ọkwa",
        "push": "Ịma ọkwa tiri mpu",
        "email_notif": "Ịma ọkwa imeel",
        "weather": "Ịdọ aka ná ntị ihu igwe",
        "crops": "Ihe ncheta ihe ọkụkụ",
        "appearance": "Ọdịdị",
        "theme": "Isiokwu",
        "system": "Nke sistemụ",
        "light": "Ọkụ",
        "dark": "Ọchịchịrị",
        "theme_desc": "Ịhọrọ Nke sistemụ ga-agba mbọ mekọrịta isiokwu gị na ntọala mkpanaka ma ọ bụ kọmputa gị ozugbo.",
        "security": "Ntọala nchekwa",
        "two_factor": "Nyocha usoro abụọ",
        "two_factor_desc": "Tinye nchekwa ọzọ",
        "change_password": "Gbanwee paswọọdụ"
      },
      "voice": {
        "trying": "Nwaa ikwu ihe",
        "failed": "Anụghị m nke ahù. Kwuo ọzọ.",
        "retry": "Nwaa ọzọ",
        "listening": "Ige ntị na {{language}}..."
      },
      "home": {
        "weather_desc": "{{location}} · {{condition}}",
        "weather_conditions": {
          "sunny": "Anwụ",
          "rainy": "Mmiri ozuzo",
          "cloudy": "Igwe ojii",
          "stormy": "Oke ikuku"
        },
        "scan": "Nyocha",
        "forecast": "Amụma ihu igwe",
        "quick_access": "Nweta ngwa ngwa",
        "recent_activity": "Ihe omume nso nso a",
        "activity_types": {
          "diagnosis": "Nchọpụta",
          "tip": "Ndụmọdụ",
          "question": "Ajụjụ"
        },
        "confidence": "{{value}}% obi ike"
      },
      "tips": {
        "featured": "A pụrụ iche",
        "personalized_title": "Nweta ndụmọdụ ahọpụtara maka gị",
        "personalized_desc": "Mee ka ọ hụ ọhụrụ site na ndụmọdụ kwa ụbọchị sitere na Greenpal Collection.",
        "get_started": "Malite ugbu a",
        "results": "{{count}} nsonaazụ",
        "all": "Niile",
        "no_results": "Enweghị nsonaazụ maka ngalaba a",
        "no_results_desc": "Anyị enweghị ndụmọdụ maka \"{{category}}\" ma, mana anyị na-agbakwunye ọtụtụ oge.",
        "show_all": "Gosi ndụmọdụ niile",
        "see_all": "Hụ niile",
        "min": "minti {{count}}",
        "categories": {
          "soil_care": "Nlekọta Ala",
          "crop_planting": "Ịkụ Ihe Ọkụkụ",
          "irrigation": "Ịgba Mmiri",
          "pest_control": "Nchịkwa Ahụhụ",
          "weed_control": "Nchịkwa Ahịhịa",
          "fertilizers": "Fatịlaịza",
          "composting": "Mmezi nri ala",
          "crop_rotation": "Ntụgharị Ihe Ọkụkụ",
          "harvesting": "Owuwe Ihe",
          "organic_farming": "Ọrụ Ugbo Okike"
        }
      },
      "you": {
        "joined": "Sonyere na {{year}} · {{email}}",
        "edit_profile": "Dezie Profaịlụ",
        "community": "Obodo",
        "community_items": {
          "knowledge": "Ịkọrịta Ihe Ọmụma",
          "collaboration": "Nkwado Ndị Ọrụ Ugbo",
          "market": "Akụkọ Azụmahịa Obodo",
          "support": "Nkwado Obodo",
          "discussions": "Mkparịta ụka Ugbo"
        },
        "growth_targets": "Ebumnuche",
        "growth_targets_status": "{{active}} na-arụ ọrụ • {{completed}} emechara",
        "no_goals": "Enweghị ihe mgbaru ọsọ uto esetịpụrụ",
        "no_goals_desc": "Lelee azụ ma emechaa maka ebumnuche arụmọrụ ọhụrụ ahaziri maka ugbo gị.",
        "badges": "Baajị & rụzuru",
        "goal_title": "Aha Ebumnuche",
        "goal_subtitle": "Obere Aha Ebumnuche",
        "categories": {
          "crops": "Ihe Ọkụkụ",
          "livestock": "Anụmanụ",
          "soil_health": "Ahụike Ala",
          "business": "Azụmahịa"
        }
      },
      "actions": {
        "chat": "Kparịta ụka",
        "voice": "Olu",
        "tips": "Ndụmọdụ",
        "history": "Akụkọ",
        "bookmarks": "Ihe akara"
      },
      "scan": {
        "title": "Nchọpụta Ihe Ọkụkụ",
        "instructions": {
          "ready": "Tinye akwụkwọ n'etiti",
          "low_light": "Achọrọ ìhè ọzọ",
          "too_far": "Bịaruo akwụkwọ nso",
          "analyzing": "Anyị na-enyocha ahụike ihe ọkụkụ..."
        },
        "viewfinder": {
          "capture": "Nyocha",
          "gallery": "Foto",
          "flash_on": "Mgbakọ ọkụ",
          "flash_off": "Gbanyụọ ọkụ"
        },
        "results": {
          "title": "Nsonaazụ Nnyocha",
          "severity": {
            "title": "Ike Ọrịa",
            "low": "Ahụike / Obere",
            "medium": "Ịdọ aka ná ntị / Ọkara",
            "high": "Ihe ize ndụ / Nnukwu"
          },
          "tabs": {
            "diagnosis": "Nchọpụta",
            "treatment": "Ọgwụgwọ",
            "prevention": "Mgbochi"
          },
          "sections": {
            "symptoms": "Mgbaàmà anyị hụrụ",
            "organic": "Ọgwụgwọ Okike",
            "chemical": "Nhọrọ Kemịkal",
            "prevention_tips": "Ntuziaka Mgbochi"
          },
          "read_aloud": "Gụọ ya n'olu",
          "stop": "Kwụsị"
        },
        "errors": {
          "camera": "A jụrụ ikike kyamara",
          "api": "Apụghị ijikọ na NVIDIA Cloud",
          "json": "Nsonaazụ nwere njehie"
        }
      },
      "weather": {
        "title": "Amuma Ihu Igwe",
        "advisory": "Ndumodu AI",
        "weekly_view": "Amuma ubochi 7",
        "details": {
          "humidity": "Mmiri n'ikuku",
          "wind": "Oko ikuku",
          "precip": "Mmiri ozuzo",
          "feels_like": "Otu odi n'aru",
          "sunrise": "Ogwugwu anwu",
          "sunset": "Odida anwu"
        },
        "units": {
          "temp": "°C",
          "speed": "km/h",
          "percentage": "%"
        },
        "status": {
          "loading": "Anyi na-eweta amuma ihu igwe...",
          "analyzing": "Anyi na-akwado ndumodu ugbo...",
          "error": "Amuma ihu igwe adighi"
        }
      }
    }
  },
  pcm: {
    translation: {
      "nav": { "home": "House", "scan": "Check am", "forecast": "Weather news", "tips": "Correct Info", "you": "You" },
      "search": { "placeholder": "Find crops, weather...", "recent": "Wetun search" },
      "profile": { "hi": "How far, {{name}}!", "settings": "Account settings", "signout": "Log out" },
      "settings": {
        "title": "Account settings",
        "personal": "Personal Info",
        "name": "Name",
        "email": "Email",
        "save": "Save",
        "language_region": "Language and Region",
        "state": "State",
        "lga": "Local Government",
        "notifications": "Notifications",
        "push": "Push notifications",
        "email_notif": "Email notifications",
        "weather": "Weather alerts",
        "crops": "Crop reminders",
        "appearance": "Appearance",
        "theme": "Theme",
        "system": "System Default",
        "light": "Light Mode",
        "dark": "Dark Mode",
        "theme_desc": "If you select System Default, we go try match your phone or computer settings.",
        "security": "Security settings",
        "two_factor": "Two-factor authentication",
        "two_factor_desc": "Add extra layer for your security",
        "change_password": "Change password"
      },
      "voice": {
        "trying": "Try speak something",
        "failed": "I no hear. Try speak again.",
        "retry": "Try am again",
        "listening": "I dey listen for {{language}}..."
      },
      "home": {
        "weather_desc": "{{location}} · {{condition}}",
        "weather_conditions": {
          "sunny": "Sun dey",
          "rainy": "Rain dey fall",
          "cloudy": "Cloud full",
          "stormy": "Heavy wind"
        },
        "scan": "Scan",
        "forecast": "Forecast",
        "quick_access": "Quick Access",
        "recent_activity": "Recent Activity",
        "activity_types": {
          "diagnosis": "Diagnosis",
          "tip": "Correct Info",
          "question": "Question"
        },
        "confidence": "{{value}}% confidence"
      },
      "tips": {
        "featured": "Featured",
        "personalized_title": "Get tips wey good for you",
        "personalized_desc": "Make am fresh with everyday correct info from Greenpal Collection.",
        "get_started": "Start am",
        "results": "{{count}} results",
        "all": "All",
        "no_results": "Nothing for dis category",
        "no_results_desc": "We never get tips for \"{{category}}\" yet, but more dey come.",
        "show_all": "Show all tips",
        "see_all": "See all",
        "min": "{{count}} min",
        "categories": {
          "soil_care": "Soil Care",
          "crop_planting": "Plant Crops",
          "irrigation": "Water Work",
          "pest_control": "Kill Inset",
          "weed_control": "Control Grass",
          "fertilizers": "Fertilizer",
          "composting": "Make Compost",
          "crop_rotation": "Change Crops",
          "harvesting": "Harvest",
          "organic_farming": "Better Farming"
        }
      },
      "you": {
        "joined": "You join since {{year}} · {{email}}",
        "edit_profile": "Edit Profile",
        "community": "Community",
        "community_items": {
          "knowledge": "Share Wetin You Sabi",
          "collaboration": "Farmers Collabo",
          "market": "Market Update",
          "support": "Helping Hands",
          "discussions": "Farm Talk"
        },
        "growth_targets": "Goals",
        "badges": "Badges & Achievements",
        "goal_title": "Goal Title",
        "goal_subtitle": "Goal Subtitle",
        "categories": {
          "crops": "Crops",
          "livestock": "Livestock",
          "soil_health": "Soil Health",
          "business": "Business"
        }
      },
      "actions": {
        "chat": "Chat",
        "voice": "Voice",
        "tips": "Tips",
        "history": "History",
        "bookmarks": "Bookmarks"
      },
      "scan": {
        "title": "Diagnose Plant",
        "instructions": {
          "ready": "Put the leaf for middle",
          "low_light": "Light small, increase am",
          "too_far": "Come near the leaf",
          "analyzing": "I dey check the plant health..."
        },
        "viewfinder": {
          "capture": "Scan am",
          "gallery": "Gallery",
          "flash_on": "Light On",
          "flash_off": "Light Off"
        },
        "results": {
          "title": "Wetin I Find",
          "severity": {
            "title": "How e serious reachable",
            "low": "Better / Small",
            "medium": "Wahala / Small small",
            "high": "Serious Wahala / High Risk"
          },
          "tabs": {
            "diagnosis": "Diagnosis",
            "treatment": "Treatment",
            "prevention": "Prevention"
          },
          "sections": {
            "symptoms": "Wetin we see",
            "organic": "Better Natural Way",
            "chemical": "Medicine Way",
            "prevention_tips": "How to Stop am"
          },
          "read_aloud": "Listen to am",
          "stop": "Stop"
        },
        "errors": {
          "camera": "You no gree make I use camera",
          "api": "I no fit reach NVIDIA Cloud",
          "json": "Result get small problem"
        }
      },
      "weather": {
        "title": "Weather Forecast",
        "advisory": "AI Advice",
        "weekly_view": "7-Day Condition",
        "details": {
          "humidity": "Oru",
          "wind": "Wind speed",
          "precip": "Rainfall",
          "feels_like": "As body de feel",
          "sunrise": "Sun start",
          "sunset": "Sun rest"
        },
        "units": {
          "temp": "°C",
          "speed": "km/h",
          "percentage": "%"
        },
        "status": {
          "loading": "We de check how weather be...",
          "analyzing": "We de look for farming advice...",
          "error": "Weather don loss"
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // Only use detector on client side
  ...(typeof window !== "undefined" && {
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  }),
});

// Register detector on client side only
if (typeof window !== "undefined" && LanguageDetector) {
  i18n.use(LanguageDetector);
}

export default i18n;
