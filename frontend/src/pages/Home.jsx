import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import vehicles from '../data/vehicles';

const Home = () => {
    const { t } = useTranslation();
    useScrollReveal();

    // Initialize calculator when component mounts
    useEffect(() => {
        const calculateBtn = document.getElementById('calculateBtn');
        const errorMessage = document.getElementById('errorMessage');

        if (calculateBtn) {
            const calculatePayment = function () {
                // Get input values
                const vehicleCost = parseFloat(document.getElementById('vehicleCost').value) || 0;
                const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
                const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
                const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;

                // Validate inputs
                if (vehicleCost <= 0 || interestRate <= 0 || loanTerm <= 0) {
                    if (errorMessage) {
                        errorMessage.classList.remove('hidden');
                        setTimeout(() => {
                            errorMessage.classList.add('hidden');
                        }, 3000);
                    }
                    return;
                }

                // Additional validation: down payment should not exceed vehicle cost
                if (downPayment >= vehicleCost) {
                    if (errorMessage) {
                        errorMessage.textContent = t('home.finance_calculator.down_payment_error');
                        errorMessage.classList.remove('hidden');
                        setTimeout(() => {
                            errorMessage.classList.add('hidden');
                            errorMessage.textContent = t('common.error');
                        }, 3000);
                    }
                    return;
                }

                // Hide error message
                if (errorMessage) {
                    errorMessage.classList.add('hidden');
                }

                // Calculate loan details
                const principal = vehicleCost - downPayment;

                // Convert annual interest rate to monthly rate (as decimal)
                const monthlyRate = interestRate / 100 / 12;

                // Calculate total number of payments
                const numberOfPayments = loanTerm * 12;

                // Calculate monthly payment using the standard amortization formula
                // M = P * (r(1+r)^n) / ((1+r)^n - 1)
                let monthlyPayment;
                if (monthlyRate > 0) {
                    monthlyPayment = principal *
                        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                } else {
                    // If interest rate is 0%, simply divide principal by number of payments
                    monthlyPayment = principal / numberOfPayments;
                }

                // Calculate total payments and total interest
                const totalPayments = monthlyPayment * numberOfPayments;
                const totalInterest = totalPayments - principal;

                // Format numbers with commas for better readability
                const formatNumber = (num) => {
                    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };

                // Update the UI with results
                if (document.getElementById('monthlyPayment')) {
                    document.getElementById('monthlyPayment').textContent = formatNumber(monthlyPayment) + ' TJS';
                }
                if (document.getElementById('totalPrincipal')) {
                    document.getElementById('totalPrincipal').textContent = formatNumber(principal) + ' TJS';
                }
                if (document.getElementById('totalInterest')) {
                    document.getElementById('totalInterest').textContent = formatNumber(totalInterest) + ' TJS';
                }
                if (document.getElementById('loanTermResult')) {
                    document.getElementById('loanTermResult').textContent = loanTerm + ' years';
                }
                if (document.getElementById('totalPayments')) {
                    document.getElementById('totalPayments').textContent = numberOfPayments + ' months';
                }
            };

            calculateBtn.addEventListener('click', calculatePayment);

            // Clean up event listener
            return () => {
                calculateBtn.removeEventListener('click', calculatePayment);
            };
        }
    }, []);

    // Services data
    const services = [
        {
            title: t('home.service_sales'),
            description: t('home.service_sales_desc'),
            icon: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
            )
        },
        {
            title: t('home.service_parts_logistics'),
            description: t('home.service_parts_logistics_desc'),
            icon: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
            )
        },
        {
            title: t('home.service_field_service'),
            description: t('home.service_field_service_desc'),
            icon: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            )
        },
        {
            title: t('home.service_attachments'),
            description: t('home.service_attachments_desc'),
            icon: (
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            )
        }
    ];

    // Stats data
    const stats = [
        { value: "500+", label: t('home.stats_vehicles') },
        { value: "50+", label: t('home.stats_brands') },
        { value: "10+", label: t('home.stats_years') },
        { value: "98%", label: t('home.stats_satisfaction') }
    ];

    // Use actual vehicles data instead of hardcoded featured products
    const featuredProducts = vehicles.slice(0, 4); // Take first 4 vehicles as featured

    return (
        <div className="page-shell home-page">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_fgLGXBLfnGjW9w1mopcnqdsicS_42zEkuDhmmNosVw9jhEB5sgyBGA-VyrR9ByP1Bo1JO0cYGMXmA1LDbDgLWxz_RtQX_sH6niBgs5Sy6K7NrL9HavFh-kMGkUguI99NjKOx4aWRB7OU7zKYFVSIl0SmD8pasu2rqOg3YbqNTxyPJE3ixpImlZsgHJUgEq-dn8Zf6rAmO5zVJVzj4L165AEn__AS6xXNLwinZ99mCL3pU-xo76TyK3wQWwmPjlicLKWTn1RkLsw"
                        alt="Heavy Machinery"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            {t('home.hero_title')}
                        </h1>
                        <p className="text-orange-300 text-lg md:text-xl font-semibold mb-4">
                            {t('home.hero_trust')}
                        </p>
                        <p className="text-gray-200 text-lg md:text-xl mb-8">
                            {t('home.hero_subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/vehicles" className="tw-btn-primary px-8 py-4 text-lg rounded-lg">
                                {t('home.explore_vehicles')}
                            </Link>
                            <Link to="/parts" className="tw-btn-secondary px-8 py-4 text-lg rounded-lg">
                                {t('home.featured_parts')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.our_services')}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {t('home.our_services_desc')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.featured_vehicles')}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {t('home.featured_vehicles_desc')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="tw-card group">
                                <div className="aspect-[4/3] bg-gray-200 rounded-t-xl overflow-hidden flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-4xl">
                                            {product.type === 'tractor' && '🚜'}
                                            {product.type === 'lorry' && '🚚'}
                                            {product.type === 'bulldozer' && '🏗️'}
                                        </span>
                                        <p className="mt-2 font-medium">{product.name}</p>
                                    </div>
                                </div>
                                <div className="tw-card-body">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <Link to={`/vehicles/${product.id}`} className="tw-btn-outline w-full text-center py-3">
                                        {t('vehicles.view_details')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/vehicles" className="tw-btn-primary px-8 py-4 text-lg rounded-lg">
                            {t('home.view_all_vehicles')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Vehicle Finance Calculator */}
            <section id="finance" className="py-20 bg-gradient-to-br from-primary to-blue-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.finance_calculator.title')}</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            {t('home.finance_calculator.description')}
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Calculator Form */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-800">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-primary mb-2">{t('home.finance_calculator.form_title')}</h3>
                                    <p className="text-gray-600">Fill in the details to calculate your monthly payment</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="vehicleCost" className="block text-sm font-semibold text-gray-700">
                                            {t('home.finance_calculator.vehicle_cost')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id="vehicleCost"
                                                placeholder="150000"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition pl-12"
                                                min="0"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                TJS
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="downPayment" className="block text-sm font-semibold text-gray-700">
                                            {t('home.finance_calculator.down_payment')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id="downPayment"
                                                placeholder="30000"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition pl-12"
                                                min="0"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                TJS
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-700">
                                                {t('home.finance_calculator.interest_rate')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="interestRate"
                                                    placeholder="12.5"
                                                    step="0.01"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition pr-12"
                                                    min="0"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                                    %
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="loanTerm" className="block text-sm font-semibold text-gray-700">
                                                {t('home.finance_calculator.loan_term')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="loanTerm"
                                                    placeholder="3"
                                                    step="0.1"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition pr-12"
                                                    min="0"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                                    yrs
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        id="calculateBtn"
                                        className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                    >
                                        {t('home.finance_calculator.calculate_button')}
                                    </button>

                                    <div id="errorMessage" className="hidden text-red-500 text-center py-3 bg-red-50 rounded-lg">
                                        {t('common.error')}
                                    </div>
                                </div>
                            </div>

                            {/* Results Summary */}
                            <div className="bg-gradient-to-br from-blue-800 to-primary rounded-2xl shadow-2xl p-8">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{t('home.finance_calculator.summary_title')}</h3>
                                    <p className="text-blue-200">Your estimated payment breakdown</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Monthly Payment Card */}
                                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-blue-200 text-sm">{t('home.finance_calculator.monthly_payment')}</p>
                                                <p id="monthlyPayment" className="text-3xl font-bold text-white mt-1">--</p>
                                            </div>
                                            <div className="bg-accent bg-opacity-20 p-3 rounded-lg">
                                                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                                            <p className="text-blue-200 text-sm">{t('home.finance_calculator.total_principal')}</p>
                                            <p id="totalPrincipal" className="text-xl font-semibold text-white mt-1">--</p>
                                        </div>

                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                                            <p className="text-blue-200 text-sm">{t('home.finance_calculator.total_interest')}</p>
                                            <p id="totalInterest" className="text-xl font-semibold text-white mt-1">--</p>
                                        </div>

                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                                            <p className="text-blue-200 text-sm">{t('home.finance_calculator.loan_term_result')}</p>
                                            <p id="loanTermResult" className="text-xl font-semibold text-white mt-1">--</p>
                                        </div>

                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                                            <p className="text-blue-200 text-sm">{t('home.finance_calculator.total_payments')}</p>
                                            <p id="totalPayments" className="text-xl font-semibold text-white mt-1">--</p>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                                        <p className="text-blue-200 text-sm italic text-center">
                                            {t('home.finance_calculator.disclaimer')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {t('home.ready_to_get_started')}
                        </h2>
                        <p className="text-xl mb-8 text-gray-200">
                            {t('home.cta_description')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="tw-btn-secondary px-8 py-4 text-lg rounded-lg">
                                {t('home.get_in_touch')}
                            </Link>
                            <Link to="/services" className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors font-bold text-lg">
                                {t('nav.services')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;