
const InicioWelcomeAdmin = () => {
  return (
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-18 mx-auto">
            <div class="flex flex-wrap -m-4">
                <div class="p-4 md:w-1/3">
                    <div class="flex rounded-lg h-full bg-black p-8 flex-col cursor-pointer hover:scale-105">
                        <div class="flex items-center mb-3">
                            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 class="text-white text-lg title-font font-semibold">Ingresos en vivo</h2>
                        </div>
                        <div class="flex-grow">
                            <p class="leading-relaxed text-white font-light my-4">Visualiza los ingresos a biblioteca en tiempo real.</p>
                        </div>
                    </div>
                </div>
            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-black p-8 flex-col cursor-pointer hover:scale-105">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    </div>
                    <h2 class="text-white text-lg title-font font-semibold">Usuarios</h2>
                </div>
                <div class="flex-grow">
                    <p class="leading-relaxed text-white my-4 font-light">Busca, crea y administra usuarios.</p>
                </div>
                </div>
            </div>
            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-black p-8 flex-col cursor-pointer hover:scale-105">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                    </div>
                    <h2 class="text-white text-lg title-font font-semibold">Reportes</h2>
                </div>
                <div class="flex-grow">
                    <p class="leading-relaxed text-base text-white font-light my-4">Genera reportes personalizados.</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default InicioWelcomeAdmin;