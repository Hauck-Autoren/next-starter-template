const pageData = {
    "howItWorks": {
        "h2": "So funktioniert unsere Zusammenarbeit",
        "subtitle": "In 6 Schritten zu einer strukturierten und eigenständig geschriebenen Masterarbeit.",
        "steps": [
            {
                "stepNumber": 1,
                "title": "Unverbindliche Anfrage stellen",
                "description": "Schicken Sie uns Ihre Anfrage und erhalten Sie schnell ein kostenloses Angebot. Diskret und unverbindlich."
            },
            {
                "stepNumber": 2,
                "title": "Angebot bestätigen",
                "description": "Bestätigen Sie unser individuelles Angebot und starten Sie Ihre Masterarbeit stressfrei."
            },
            {
                "stepNumber": 3,
                "title": "Akademischen Coach zugewiesen bekommen",
                "description": "Wir wählen den passenden akademischen Coach für Ihr Thema aus – mit fundierter Expertise."
            },
            {
                "stepNumber": 4,
                "title": "Direkte Kommunikation",
                "description": "Sie stehen im direkten Austausch mit Ihrem Coach für individuelle Begleitung und Feedback."
            },
            {
                "stepNumber": 5,
                "title": "Teillieferungen und Qualitätssicherung",
                "description": "Sie erhalten regelmäßiges Feedback und bei Bedarf ein professionelles Lektorat zur Qualitätssicherung."
            },
            {
                "stepNumber": 6,
                "title": "Finale Version erhalten",
                "description": "Sie entwickeln Ihre Masterarbeit eigenständig – mit unserer strukturierten Begleitung und mit mehr Klarheit und Sicherheit."
            }
        ]
    },
}

const HowItWorks = () => {
    return (

        <>
            {/*  HOW it WORKS */}
            <section className="bg-light py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-5xl">{pageData?.howItWorks?.h2}</h2>
                        <p className="mt-6 text-lg/8 text-dark">
                            {pageData?.howItWorks?.subtitle}
                        </p>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl"></h2>
                            <p className="mt-6 text-lg leading-8 text-muted"></p>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {pageData?.howItWorks?.steps.map((step, index) => (
                                <div key={index} className="relative pl-16">
                                    <h3 className="text-xl font-semibold leading-7 text-primary">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <span className="text-white">{step.stepNumber}</span>
                                        </div>
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-base leading-7 text-muted">
                                        {step.description}

                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* HOW it WORKS end */}
        </>
    );
};
export default HowItWorks;