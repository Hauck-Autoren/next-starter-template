"use client"
import { useCookieConsent } from '../context/CookieConsent';

// helper sigur pentru dataLayer
const pushDL = (payload) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
};




const Anfrage = () => {
    const { cookiesAccepted } = useCookieConsent();

    return (
        <>
            <section id="kontakt" className="bg-white mt-12 py-4">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl sm:text-center">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-accent md:text-5xl sm:text-balance">
                            Wir beraten Sie gerne kostenlos
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted lg:text-xl/8">
                            Wir unterstützen Sie individuell und finden gemeinsam die passende Lösung für Ihre Situation.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">

                        {/* Formular / Hinweis */}
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            {cookiesAccepted ? (
                                <heyflow-wrapper
                                    flow-id="8sNYmpDA9STe2iygzN1c"
                                    dynamic-height
                                    scroll-up-on-navigation
                                    style-config='{"width":"600px"}'
                                ></heyflow-wrapper>
                            ) : (
                                <p className="text-sm text-accent italic mt-2">
                                    Hinweis: Das Anfrageformular wird nur angezeigt, wenn Sie der Verwendung von Cookies zugestimmt haben.
                                </p>
                            )}
                        </div>

                        {/* Kontaktmöglichkeiten */}
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto flex-col gap-4 max-w-xs px-8">
                                    <p className="text-base font-semibold text-muted">
                                        Ihre Anliegen stehen bei uns im Mittelpunkt
                                    </p>

                                    <a
                                        href="tel:+4921186942731"

                                        onClick={() => pushDL({ event: 'kontakt_click', channel: 'telefon' })}
                                        className="mt-4 text-sm/6 font-semibold btn btn-accent"
                                    >
                                        Uns anrufen
                                    </a>

                                    <a
                                        href={`https://wa.me/491772012965?text=Hallo! Ich komme von der Seite hauckautoren-de...`}
                                        target="_blank"
                                        rel="noopener"
                                        onClick={() => pushDL({
                                            event: 'kontakt_click',
                                            channel: 'whatsapp',
                                            site: location.hostname,
                                            page_path: location.pathname + location.search,
                                            position: 'kontakt_section'
                                        })}
                                        className="mt-4 text-sm/6 font-semibold btn btn-primary"
                                    >
                                        WhatsApp schreiben
                                    </a>

                                    <a
                                        href="mailto:kontakt@email.hauckautoren.com"
                                        rel="nofollow"
                                        onClick={() => pushDL({ event: 'kontakt_click', channel: 'email' })}
                                        className="mt-4 text-sm/6 font-semibold btn btn-accent"
                                    >
                                        E-Mail senden
                                    </a><p className='hidden md:block text-sm text-muted mt-2'>
                                        kontakt@email.hauckautoren.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Anfrage;
