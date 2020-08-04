<template>
    <el-dialog
        :visible.sync="visible"
        :show="show"
        title="提示"
        width="30%"
        center
        @close="OnClose()"
    >
        <div>
            <img :src="imgSrc" alt="">
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: "TemplateDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imageType: {
      type: String,
      default: "A"
    }
  },
  data() {
    return {
      visible: this.show,
      imageSrcData: [
        {
          type: "A",
          url: "http://www.xxx.com/images/a.jpg" //图片的地址
        },
        {
            type: 'defalut',
            url: "http://www.xxx.com/images/default.jpg"
        }
      ]
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show;
      }
    }
  },
  computed: {
    imgSrc() {
      let item = this.imageSrcData.find(item =>item.type === this.imageType)
      if(item){
          return item.url
      }
      return this.imageSrcData['defalut'].url // 匹配不到给一个默认的地址
    }
  },
  methods: {
    OnClose() {
      this.$emit("update:show", false);
    }
  }
};
</script>