<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card layouts flex flex-column justify-content-center fadein animation-duration-200">
        <div class="surface-section text-center">
            <div class="mb-4 -mt-6 font-bold text-3xl">
                <span class="text-primary">The Creator</span>
                <span class="text-900 ml-3">of B.E.S.T</span>
            </div>
            <div class="grid">
                <div class="col-12 md:col-4 mb-4 px-5">
                    <span class="p-3 inline-block">
                        <img src="../public/img/1.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">UI/UX Designer</div>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <span class="p-3 inline-block">
                        <img src="../public/img/2.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">Front-end Developer</div>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <span class="p-3 inline-block">
                        <img src="../public/img/3.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">Back-end Developer</div>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <span class="p-3 inline-block">
                        <img src="../public/img/4.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">Software Tester</div>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <span class="p-3 inline-block">
                        <img src="../public/img/5.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">DevOps</div>
                </div>
                <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
                    <span class="p-3 inline-block">
                        <img src="../public/img/6.jpg" class="img-profile border-circle">
                    </span>
                    <div class="text-700 line-height-3">Project Manager</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.layouts {
    height: calc(100vh - 12rem);
}

.img-profile {
    width: 120px;
    height: 120px;
    object-fit: cover;
}
</style>