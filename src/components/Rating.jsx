

const Rating = () => {

    return (
        <>
            <section className="py-16 sm:py-24 flex flex-col">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="flex flex-col mb-8">

                            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Für uns zählen
                                Kundenmeinungen!</h2>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-3 p-4">

                        {/* <!-- Kundenrezension-Start --> */}
                        <div className="bg-light p-8 rounded-lg shadow-lg flex-col">
                            {/* <!-- Star Rating --> */}
                            <div className="flex justify-center mb-4">
                                <span className="text-accent text-xl">
                                    &#9733; &#9733; &#9733; &#9733; &#9733;
                                </span>
                            </div>
                            {/* <!-- Blockquote --> */}
                            <blockquote className="text-muted text-center italic">
                                “Hallo Zusammen,
                                ich wurde bei meiner Masterarbeit von HAUCK & AUTOREN professionell begleitet und unterstützt – von der Struktur bis zum
                                Feinschliff. Ein toller Austausch zwischen mir und meinem Coach hat stattgefunden.
                                Alles verlief sehr gut. Note sehr gut und ich war optimal auf die Verteidigung vorbereitet.”
                            </blockquote>

                            <div className="flex items-center justify-between gap-4 mt-4">
                                {/* <!-- name & info --> */}
                                <div className="w-auto text-left mb-4">
                                    <p className=" text-dark font-semibold">Fuad</p>
                                    <p className="text-accent">Informative Coaching</p>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Kundenrezension-END --> */}
                        {/* 
        <!-- Kundenrezension-Start --> */}
                        <div className="bg-light p-8 rounded-lg shadow-lg flex-col">
                            {/* <!-- Star Rating --> */}
                            <div className="flex justify-center mb-4">
                                <span className="text-accent text-xl">
                                    &#9733; &#9733; &#9733; &#9733; &#9733;
                                </span>
                            </div>
                            {/* <!-- Blockquote --> */}
                            <blockquote className="text-muted text-center italic">
                                “Ich bin mit der Unterstützung durch HAUCK & AUTOREN sehr zufrieden.
                                Die Kommunikation mit meiner Coachin und dem Kundenservice war einwandfrei und freundlich.
                                Das Feedback war fundiert und hat mir geholfen, meinen Text auf ein neues Niveau zu bringen. Danke!”
                            </blockquote>
                            <div className="flex items-center justify-between gap-4 mt-4">
                                {/* <!-- name & info --> */}
                                <div className="w-auto text-left mb-4">
                                    <p className=" text-dark font-semibold">Maria</p>
                                    <p className="text-accent">Masterarbeit</p>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Kundenrezension-END --> */}

                        {/* <!-- Kundenrezension-Start --> */}
                        <div className="bg-light p-8 rounded-lg shadow-lg flex-col">
                            {/* <!-- Star Rating --> */}
                            <div className="flex justify-center mb-4">
                                <span className="text-accent text-xl">
                                    &#9733; &#9733; &#9733; &#9733; &#9733;
                                </span>
                            </div>
                            {/* <!-- Blockquote --> */}
                            <blockquote className="text-muted text-center italic">
                                “Der Prüfungshelfer war extrem nützlich! Die Materialien waren gut strukturiert und leicht
                                verständlich. Dank der klaren Erklärungen konnte ich mich effizient vorbereiten. Die Tipps waren
                                praxisnah und halfen mir, meine Nervosität zu überwinden. Absolut empfehlenswert!”
                            </blockquote>
                            <div className="flex items-center justify-between gap-4 mt-4">
                                {/* <!-- name & info --> */}
                                <div className="w-auto text-left mb-4">
                                    <p className=" text-dark font-semibold">Magda</p>
                                    <p className="text-accent">Plagiatsprüfung</p>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Kundenrezension-END --> */}
                    </div>
                </div>
            </section>
        </>

    );
}
export default Rating