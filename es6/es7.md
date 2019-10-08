  async rankingList() {
      let res = await this.$api.home.rankingList({
        page: '1', // 页数
        rows: '30' //
      });
      this.list = res.list;
    }