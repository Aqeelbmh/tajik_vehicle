import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            // Home page translations
            "home": {
                "hero_title": "Heavy Machinery & Spare Parts Specialists",
                "hero_trust": "Serving Tajikistan with ISO Certified Equipment and Genuine OEM Parts",
                "hero_subtitle": "Professional solutions for construction, agriculture, and industrial equipment",
                "hero_cta": "Request a Quote",
                "check_inventory": "Check Part Inventory",
                "explore_vehicles": "Explore Vehicles",
                "featured_vehicles": "Featured Vehicles",
                "featured_trucks": "Featured Trucks",
                "featured_parts_stock": "Critical Spare Parts in Stock",
                "featured_vehicles_desc": "Discover our premium selection of heavy machinery designed for maximum performance and durability",
                "featured_parts": "Popular Spare Parts",
                "partners": "Our Partners",
                "partners_subtitle": "Trusted by industry leaders across Central Asia",
                "contact_us": "Contact Us",
                "stats_vehicles": "Vehicles in Stock",
                "stats_brands": "International Brands",
                "stats_years": "Years Experience",
                "stats_satisfaction": "Customer Satisfaction",
                "service_sales": "Heavy Equipment Sales",
                "service_sales_desc": "New/Used equipment with leasing options for all major brands",
                "service_parts_logistics": "Spare Parts Logistics",
                "service_parts_logistics_desc": "Rapid delivery and large stock of genuine OEM parts",
                "service_field_service": "Field Service & Diagnostics",
                "service_field_service_desc": "Mobile repair unit availability across all regions",
                "service_attachments": "Specialized Attachments",
                "service_attachments_desc": "Undercarriage components, buckets, hydraulic hammers",
                "our_services": "Our Services",
                "our_services_desc": "We provide comprehensive solutions to keep your heavy machinery operational",
                "trust_title": "Your Tajikistan Machinery Advantage",
                "trust_subtitle": "Why industry leaders choose us for their heavy equipment needs",
                "trust_fulfillment": "Parts Fulfillment Rate",
                "trust_response": "Response Guarantee",
                "trust_regions": "Regions Coverage",
                "trust_warranty": "Full Manufacturer Warranty Support",
                "filter_machinery": "Machinery",
                "filter_trucks": "Trucks",
                "filter_spares": "Spares",
                "request_parts": "Request Parts",
                "mid_cta_title": "Need a specific part now?",
                "mid_cta_description": "Our inventory locator is live. Get rapid pricing and delivery schedules.",
                "mid_cta_button": "Instant Quote Request",
                "testimonials_title": "What Our Clients Say",
                "testimonials_subtitle": "Trusted by industry professionals across Tajikistan",
                "testimonial_1_quote": "Vast Builders provided us with critical excavator parts when our supplier failed. Their 2-hour response saved our construction project.",
                "testimonial_1_author": "Murod",
                "testimonial_1_company": "Dushanbe Construction",
                "testimonial_2_quote": "The quality of their used bulldozers and after-sales service is unmatched in the region. We've been partners for 5 years.",
                "testimonial_2_author": "Farhod",
                "testimonial_2_company": "Khujand Earthworks",
                "ready_to_get_started": "Ready to Get Started?",
                "cta_description": "Contact us today for a personalized consultation and quote",
                "get_in_touch": "Get in Touch",
                "view_all_vehicles": "View All Vehicles",
                "finance_calculator": {
                    "title": "Estimate Your Investment",
                    "description": "Calculate your monthly payments and total investment for your next heavy machinery purchase in Tajikistan",
                    "form_title": "Financing Details",
                    "vehicle_cost": "Vehicle Cost (TJS)",
                    "down_payment": "Down Payment (TJS)",
                    "interest_rate": "Annual Interest Rate (%)",
                    "loan_term": "Loan Term (Years)",
                    "calculate_button": "Calculate Payment",
                    "summary_title": "Payment Summary",
                    "monthly_payment": "Monthly Payment",
                    "total_principal": "Total Principal",
                    "total_interest": "Total Interest",
                    "loan_term_result": "Loan Term",
                    "total_payments": "Total Payments",
                    "disclaimer": "This calculator provides an estimate based on typical financing rates in Tajikistan. Actual payments may vary.",
                    "down_payment_error": "Down payment must be less than vehicle cost"
                }
            },
            // Navigation translations
            "nav": {
                "home": "Home",
                "vehicles": "Vehicles",
                "parts": "Spare Parts",
                "services": "Services",
                "about": "About Us",
                "partners": "Partners",
                "gallery": "Gallery",
                "contact": "Contact"
            },
            // Vehicle page translations
            "vehicles": {
                "title": "Our Vehicle Fleet",
                "filter_by_type": "Filter by Type",
                "filter_by_brand": "Filter by Brand",
                "tractor": "Tractor",
                "lorry": "Lorry",
                "bulldozer": "Bulldozer",
                "view_details": "View Details",
                "request_quote": "Request Quote"
            },
            // Parts page translations
            "parts": {
                "title": "Spare Parts Catalog",
                "search_placeholder": "Search by part number, vehicle model or type",
                "categories": "Parts Categories",
                "engine": "Engine Parts",
                "hydraulics": "Hydraulic Systems",
                "chassis": "Chassis Components",
                "filters": "Filters & Oils",
                "electrical": "Electrical Systems",
                "request_availability": "Request Availability"
            },
            // Services page translations
            "services": {
                "title": "Our Services",
                "maintenance": "Maintenance & Repair",
                "diagnostics": "Diagnostic Services",
                "delivery": "Spare Parts Delivery",
                "support": "On-Site Support",
                "description": "We offer comprehensive services to keep your heavy machinery operational"
            },
            // About page translations
            "about": {
                "title": "About Our Company",
                "mission": "Our Mission",
                "history": "Company History",
                "team": "Our Leadership"
            },
            // Partners page translations
            "partners": {
                "title": "Our Partners",
                "become_partner": "Become a Partner"
            },
            // Gallery page translations
            "gallery": {
                "title": "Project Gallery",
                "vehicles": "Delivered Vehicles",
                "workshop": "Our Workshop",
                "projects": "Client Projects"
            },
            // Contact page translations
            "contact": {
                "title": "Contact Us",
                "address": "Our Office",
                "phone": "Phone",
                "email": "Email",
                "hours": "Working Hours",
                "form_title": "Send us a Message",
                "name": "Full Name",
                "company": "Company Name",
                "message": "Your Message",
                "send": "Send Message",
                "hours": "Working Hours"
            },
            // Common translations
            "common": {
                "language": "Language",
                "english": "English",
                "russian": "Русский",
                "tajik": "Тоҷикӣ",
                "loading": "Loading...",
                "submitting": "Submitting...",
                "success": "Success!",
                "error": "An error occurred. Please try again.",
                "inquiry": "Inquiry"
            }
        }
    },
    ru: {
        translation: {
            // Home page translations
            "home": {
                "hero_title": "Специалисты по тяжелой технике и запасным частям",
                "hero_trust": "Обслуживаем Таджикистан сертифицированным оборудованием и оригинальными запчастями OEM",
                "hero_subtitle": "Профессиональные решения для строительной, сельскохозяйственной и промышленной техники",
                "hero_cta": "Запросить цену",
                "check_inventory": "Проверить наличие запчастей",
                "explore_vehicles": "Изучить автомобили",
                "featured_vehicles": "Популярные автомобили",
                "featured_trucks": "Популярные грузовики",
                "featured_parts_stock": "Критические запасные части в наличии",
                "featured_vehicles_desc": "Откройте для себя нашу премиальную коллекцию тяжелой техники, разработанной для максимальной производительности и долговечности",
                "featured_parts": "Популярные запасные части",
                "partners": "Наши партнеры",
                "partners_subtitle": "Нам доверяют ведущие компании Центральной Азии",
                "contact_us": "Связаться с нами",
                "stats_vehicles": "Автомобилей в наличии",
                "stats_brands": "Международные бренды",
                "stats_years": "Лет опыта",
                "stats_satisfaction": "Удовлетворенность клиентов",
                "service_sales": "Продажа тяжелой техники",
                "service_sales_desc": "Новая/б/у техника с опциями лизинга для всех основных брендов",
                "service_parts_logistics": "Логистика запасных частей",
                "service_parts_logistics_desc": "Быстрая доставка и большой запас оригинальных запчастей OEM",
                "service_field_service": "Выездное обслуживание и диагностика",
                "service_field_service_desc": "Мобильная ремонтная бригада во всех регионах",
                "service_attachments": "Специализированные навесные устройства",
                "service_attachments_desc": "Ходовая часть, ковши, гидромолоты",
                "our_services": "Наши услуги",
                "our_services_desc": "Мы предоставляем комплексные решения для обеспечения работоспособности вашей тяжелой техники",
                "trust_title": "Ваше преимущество в Таджикистане",
                "trust_subtitle": "Почему ведущие предприятия выбирают нас для своих нужд в тяжелой технике",
                "trust_fulfillment": "Выполнение заказов на запчасти",
                "trust_response": "Гарантия ответа",
                "trust_regions": "Покрытие регионов",
                "trust_warranty": "Полная поддержка гарантии производителя",
                "filter_machinery": "Техника",
                "filter_trucks": "Грузовики",
                "filter_spares": "Запчасти",
                "request_parts": "Запросить запчасти",
                "mid_cta_title": "Нужна конкретная деталь прямо сейчас?",
                "mid_cta_description": "Наша система поиска запасов активна. Получите быстрые цены и сроки поставки.",
                "mid_cta_button": "Мгновенный запрос цены",
                "testimonials_title": "Отзывы наших клиентов",
                "testimonials_subtitle": "Нам доверяют профессионалы отрасли по всему Таджикистану",
                "testimonial_1_quote": "Vast Builders предоставили нам критически важные детали экскаватора, когда наш поставщик подвел. Их ответ в течение 2 часов спас наш строительный проект.",
                "testimonial_1_author": "Мурад",
                "testimonial_1_company": "Строительство Душанбе",
                "testimonial_2_quote": "Качество их б/у бульдозеров и послепродажное обслуживание не имеют себе равных в регионе. Мы сотрудничаем уже 5 лет.",
                "testimonial_2_author": "Фарход",
                "testimonial_2_company": "Земляные работы Худжанд",
                "ready_to_get_started": "Готовы начать?",
                "cta_description": "Свяжитесь с нами сегодня для индивидуальной консультации и получения цены",
                "get_in_touch": "Связаться с нами",
                "view_all_vehicles": "Посмотреть все автомобили",
                "finance_calculator": {
                    "title": "Рассчитайте свои инвестиции",
                    "description": "Рассчитайте ежемесячные платежи и общие инвестиции для вашей следующей покупки тяжелой техники в Таджикистане",
                    "form_title": "Детали финансирования",
                    "vehicle_cost": "Стоимость автомобиля (TJS)",
                    "down_payment": "Первоначальный взнос (TJS)",
                    "interest_rate": "Годовая процентная ставка (%)",
                    "loan_term": "Срок кредита (лет)",
                    "calculate_button": "Рассчитать платеж",
                    "summary_title": "Сводка платежей",
                    "monthly_payment": "Ежемесячный платеж",
                    "total_principal": "Общая основная сумма",
                    "total_interest": "Общий процент",
                    "loan_term_result": "Срок кредита",
                    "total_payments": "Всего платежей",
                    "disclaimer": "Этот калькулятор дает оценку на основе типичных процентных ставок по финансированию в Таджикистане. Фактические платежи могут отличаться.",
                    "down_payment_error": "Первоначальный взнос должен быть меньше стоимости автомобиля"
                }
            },
            // Navigation translations
            "nav": {
                "home": "Главная",
                "vehicles": "Автомобили",
                "parts": "Запасные части",
                "services": "Услуги",
                "about": "О нас",
                "partners": "Партнеры",
                "gallery": "Галерея",
                "contact": "Контакты"
            },
            // Vehicle page translations
            "vehicles": {
                "title": "Наш автопарк",
                "filter_by_type": "Фильтр по типу",
                "filter_by_brand": "Фильтр по марке",
                "tractor": "Трактор",
                "lorry": "Грузовик",
                "bulldozer": "Бульдозер",
                "view_details": "Подробнее",
                "request_quote": "Запрос цены"
            },
            // Parts page translations
            "parts": {
                "title": "Каталог запасных частей",
                "search_placeholder": "Поиск по номеру детали, модели автомобиля или типу",
                "categories": "Категории запчастей",
                "engine": "Двигатель",
                "hydraulics": "Гидравлические системы",
                "chassis": "Шасси",
                "filters": "Фильтры и масла",
                "electrical": "Электрические системы",
                "request_availability": "Запросить наличие"
            },
            // Services page translations
            "services": {
                "title": "Наши услуги",
                "maintenance": "Обслуживание и ремонт",
                "diagnostics": "Диагностические услуги",
                "delivery": "Доставка запасных частей",
                "support": "Выездная поддержка",
                "description": "Мы предлагаем комплексные услуги для поддержания работоспособности вашей тяжелой техники"
            },
            // About page translations
            "about": {
                "title": "О нашей компании",
                "mission": "Наша миссия",
                "history": "История компании",
                "team": "Наше руководство"
            },
            // Partners page translations
            "partners": {
                "title": "Наши партнеры",
                "become_partner": "Стать партнером"
            },
            // Gallery page translations
            "gallery": {
                "title": "Галерея проектов",
                "vehicles": "Поставленные автомобили",
                "workshop": "Наша мастерская",
                "projects": "Проекты клиентов"
            },
            // Contact page translations
            "contact": {
                "title": "Связаться с нами",
                "address": "Наш офис",
                "phone": "Телефон",
                "email": "Электронная почта",
                "hours": "Часы работы",
                "form_title": "Отправьте нам сообщение",
                "name": "Полное имя",
                "company": "Название компании",
                "message": "Ваше сообщение",
                "send": "Отправить сообщение",
                "hours": "Часы работы"
            },
            // Common translations
            "common": {
                "language": "Язык",
                "english": "English",
                "russian": "Русский",
                "tajik": "Тоҷикӣ",
                "loading": "Загрузка...",
                "submitting": "Отправка...",
                "success": "Успех!",
                "error": "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
                "inquiry": "Запрос"
            }
        }
    },
    tg: {
        translation: {
            // Home page translations
            "home": {
                "hero_title": "Мутахассисон дар соҳаи мошинҳои вазнин ва қисмҳои эҳтиётӣ",
                "hero_trust": "Таҷикистонро бо таҷҳизоти сертификатшуда ва қисмҳои аслии OEM хидмат мекунем",
                "hero_subtitle": "Ҳалли профессионалӣ барои таҷҳизоти сохтмонӣ, кишоварзӣ ва саноатӣ",
                "hero_cta": "Дархости нарх",
                "check_inventory": "Мавҷудияти қисмҳоро санҷед",
                "explore_vehicles": "Мошинҳоро кашф кунед",
                "featured_vehicles": "Мошинҳои барҷаста",
                "featured_trucks": "Тракҳои барҷаста",
                "featured_parts_stock": "Қисмҳои эҳтиётии критикӣ дар анбор",
                "featured_vehicles_desc": "Коллексияи премиуми мошинаҳои вазнинро барои иҷроиши ҳадди аксар ва доимият кашф кунед",
                "featured_parts": "Қисмҳои эҳтиётии популярӣ",
                "partners": "Шарикони мо",
                "partners_subtitle": "Ба онҳои ширкатҳои саркории Осиёи Марказӣ эътимод мекунанд",
                "contact_us": "Бо мо тамос гиред",
                "stats_vehicles": "Мошинҳо дар анбор",
                "stats_brands": "Брендҳои байналмилалӣ",
                "stats_years": "Солҳои таҷриба",
                "stats_satisfaction": "Қонеъияти муштариён",
                "service_sales": "Фурӯши таҷҳизоти вазнин",
                "service_sales_desc": "Таҷҳизоти нав/б/у бо имконоти иҷора барои ҳамаи брендҳои асосӣ",
                "service_parts_logistics": "Логистикаи қисмҳои эҳтиётӣ",
                "service_parts_logistics_desc": "Таҳвил додани тез ва захираи калони қисмҳои аслии OEM",
                "service_field_service": "Хидмати соҳавӣ ва диагностика",
                "service_field_service_desc": "Дастгирии таъмир дар ҳамаи ноҳияҳо",
                "service_attachments": "Замимаҳои махсус",
                "service_attachments_desc": "Қисмҳои поён, ширмакҳо, чакӯҳои гидравлӣ",
                "our_services": "Хидматҳои мо",
                "our_services_desc": "Мо ҳалҳои ҷомеъро пешниҳод мекунем, то техникаи вазнини шуморо коркард намоем",
                "trust_title": "Бартарии шумо дар Тоҷикистон",
                "trust_subtitle": "Чаро раҳбарони соҳа мошаро барои ниёзҳои техникаи вазнин интихоб мекунанд",
                "trust_fulfillment": "Ҳисоби қисмҳои фурӯхташуда",
                "trust_response": "Кафолати посух",
                "trust_regions": "Пӯшиши ноҳияҳо",
                "trust_warranty": "Дастгирии пурраи кафолати истеҳсолкунанда",
                "filter_machinery": "Техника",
                "filter_trucks": "Тракҳо",
                "filter_spares": "Қисмҳои эҳтиётӣ",
                "request_parts": "Дархости қисмҳо",
                "mid_cta_title": "Ҳоло ба қисме муҳтож ҳастед?",
                "mid_cta_description": "Макони мавҷудияти мо фаъол аст. Нархҳои тез ва мӯҳлати таҳвилро гиред.",
                "mid_cta_button": "Дархости фаврӣ",
                "testimonials_title": "Он чи муштариёни мо мегӯянд",
                "testimonials_subtitle": "Ба онҳои мутахассисони соҳа дар тамоми Тоҷикистон эътимод мекунанд",
                "testimonial_1_quote": "Vast Builders ба мо қисмҳои критикӣ доданд, вақте ки таъминкунандаи мо ноком монд. Пошуни онҳо дар давоми 2 соат лоиҳаи сохтмонии мо ҷамъ кард.",
                "testimonial_1_author": "Мурад",
                "testimonial_1_company": "Созмони Душанбе",
                "testimonial_2_quote": "Сифати тракторҳои б/у ва хидмати баъд аз фурӯш дар минтақа беҳамто аст. Мо 5 сол аст ки шарикем.",
                "testimonial_2_author": "Фарҳод",
                "testimonial_2_company": "Корҳои заминӣ дар Хуҷанд",
                "ready_to_get_started": "Омодаед, оғоз кунед?",
                "cta_description": "Имрӯз бо мо барои маслиҳати шахсӣ ва дархости нарх тамос гиред",
                "get_in_touch": "Бо мо тамос гиред",
                "view_all_vehicles": "Ҳамаи мошинҳоро дида бароед",
                "finance_calculator": {
                    "title": "Сармоягузории худро баҳоб кунед",
                    "description": "Пардохтҳои моҳона ва сармоягузории умумии худро барои хариди навбатии техникаи вазнин дар Тоҷикистон ҳисоб кунед",
                    "form_title": "Тафсилоти молиявӣ",
                    "vehicle_cost": "Арзиши мошин (TJS)",
                    "down_payment": "Пардохти пешакӣ (TJS)",
                    "interest_rate": "Суръати фоизи солона (%)",
                    "loan_term": "Мӯҳлати қарз (Солҳо)",
                    "calculate_button": "Ҳисоб кардани пардохт",
                    "summary_title": "Хулосаи пардохтҳо",
                    "monthly_payment": "Пардохти ҳармоҳа",
                    "total_principal": "Умумии асосӣ",
                    "total_interest": "Умумии фоиз",
                    "loan_term_result": "Мӯҳлати қарз",
                    "total_payments": "Ҳамаи пардохтҳо",
                    "disclaimer": "Ин калкулятор баҳои тахминиро дар асоси суръати фоизи оддии дар Тоҷикистон муайян мекунад. Пардохтҳои воқеӣ метавонанд фарқ кунанд.",
                    "down_payment_error": "Пардохти пешакӣ бояд аз арзиши мошин камтар бошад"
                }
            },
            // Navigation translations
            "nav": {
                "home": "Асосӣ",
                "vehicles": "Мошинҳо",
                "parts": "Қисмҳои эҳтиётӣ",
                "services": "Хидматҳо",
                "about": "Дар бораи мо",
                "partners": "Шарикон",
                "gallery": "Галерея",
                "contact": "Тамос"
            },
            // Vehicle page translations
            "vehicles": {
                "title": "Парки мошинҳои мо",
                "filter_by_type": "Филтр бо намуд",
                "filter_by_brand": "Филтр бо бренди",
                "tractor": "Трактор",
                "lorry": "Боркаш",
                "bulldozer": "Булдозер",
                "view_details": "Тафсилотро дида бароед",
                "request_quote": "Дархости нарх"
            },
            // Parts page translations
            "parts": {
                "title": "Каталоги қисмҳои эҳтиётӣ",
                "search_placeholder": "Ҷустуҷӯ аз рӯи рақами қисм, намунаи мошин ё намуд",
                "categories": "Категорияҳои қисмҳо",
                "engine": "Муҳаррик",
                "hydraulics": "Системаҳои гидравликӣ",
                "chassis": "Шасси",
                "filters": "Филтрҳо ва равгониҳо",
                "electrical": "Системаҳои барқӣ",
                "request_availability": "Дархости дастрасӣ"
            },
            // Services page translations
            "services": {
                "title": "Хидматҳои мо",
                "maintenance": "Нигоҳдорӣ ва таъмир",
                "diagnostics": "Хидматҳои диагностика",
                "delivery": "Таҳвил додани қисмҳои эҳтиётӣ",
                "support": "Пуштибонии дар ҷой",
                "description": "Мо хидматҳои ҷомеъро пешниҳод мекунем, то техникаи вазнини шуморо коркард намоем"
            },
            // About page translations
            "about": {
                "title": "Дар бораи ширкати мо",
                "mission": "Миссияи мо",
                "history": "Таърихи ширкат",
                "team": "Раҳбарияти мо"
            },
            // Partners page translations
            "partners": {
                "title": "Шарикони мо",
                "become_partner": "Шарик шавед"
            },
            // Gallery page translations
            "gallery": {
                "title": "Галереяи лоиҳаҳо",
                "vehicles": "Мошинҳои таҳвил дода шуда",
                "workshop": "Коргоҳи мо",
                "projects": "Проектаҳои муштариён"
            },
            // Contact page translations
            "contact": {
                "title": "Бо мо тамос гиред",
                "address": "Дофтари мо",
                "phone": "Телефон",
                "email": "Почтаи электронӣ",
                "hours": "Соатҳои корӣ",
                "form_title": "Ба мо паём равон кунед",
                "name": "Номи пурра",
                "company": "Номи ширкат",
                "message": "Паёми шумо",
                "send": "Паём равон кардан",
                "hours": "Соатҳои корӣ"
            },
            // Common translations
            "common": {
                "language": "Забон",
                "english": "English",
                "russian": "Русский",
                "tajik": "Тоҷикӣ",
                "loading": "Боргузорӣ...",
                "submitting": "Ирсол кардан...",
                "success": "Муваффақият!",
                "error": "Хатогӣ ба миён омад. Лутфан, боз кӯшиш кунед.",
                "inquiry": "Дархост"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;