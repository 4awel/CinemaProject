<template>
  <div class="video-block">
    <div class="video-block_container">
      <div class="video-block_block"><h2>{{ $t("main.blocks.block-video.slogan") }}</h2></div>
      <div class="video-block_video-content">
        <video
          src="../../assets/video-block.mp4"
          autoplay
          muted
          loop
          type="video/mp4"
        ></video>
        <div class="video-block_about-content">
            <div class="video-block_up">
                <h3>{{ $t("main.blocks.block-video.title") }}</h3>
                <b
                  >
                  {{ $t("main.blocks.block-video.description") }}
                </b>
            </div>
          <div class="video-block_down">
              <button>{{ $t("main.blocks.block-video.button") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

.video-block {
  width: 100%;
  position: relative;

  &_container {
    position: relative;
  }

  &_video-content {
    position: relative;
    width: 100%;
    overflow: hidden;

    video {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &_about-content {
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 10px 0px 10px 20px #111;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px;
    background-color: #111;
    color: #fff;
    width: 30%;
    max-width: 400px;
    box-sizing: border-box;
    z-index: 30;
  }

  &_block {
    padding: 10vh;
    background-color: #111;
    box-shadow: 0px 0px 30px 20px #111;
    z-index: 40;
    color: #fff;
    text-align: center;
  }

  &_up h3 {
    color: #fed905;
  }

  &_down button {
    width: 100%;
    background-color: #00000000;
    border: 2px solid #fed905;
    color: #fed905;
    border-radius: 12px;
    padding: 16px;
    font-size: 2vh;
    transition: all 250ms;
  }

  &_down button:hover {
    transition: all 250ms;
    color: #333;
    background-color: #fed905;
  }

  @media (max-width: 1100px) {
    .video-block_about-content {
      position: static;
      align-items: center;
      transform: none;
      width: 100%;
      max-width: none;
      margin-top: -5px; // убираем возможный зазор между видео и текстом
    }

    .video-block_down {
        padding-top: 12px;
        width: 100%;
    }
  }
}
</style>
