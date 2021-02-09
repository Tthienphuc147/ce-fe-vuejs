<template>
  <div class="loader-overlay">
    <div class="loading2"></div>
  </div>
</template>

<script>
export default {
  name: "SpinnerLoading",
};
</script>

<style lang="scss">
.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  cursor: pointer;
  .loading,
  .loading2 {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    align-items: center;
  }

  .loading::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 10px solid #dddddd;
    border-top-color: #60d460;
    /* border-bottom-color: #60d460;  -- optional */
    border-radius: 50%;
    /* animation: spin 0.6s 0.1s linear infinite both; -- optional */
    animation: spin 0.8s 0.1s ease-in-out infinite both;
  }

  .loading2::after {
    content: "";
    width: 30px;
    height: 30px;
    background: #60d460;
    border-radius: 50%;
    opacity: 0.5;
    animation: bounce 0.4s ease infinite alternate;
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    to {
      opacity: 1;
      transform: scale(1.75);
    }
  }
}
</style>