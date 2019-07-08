import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip'
// import wepy from 'wepy'
import {
  USER_INFO,
  USER_TOKEN
} from '@/utils/constant';


// let UsetTocken;

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
const wxRequest = async (params = {}, url) => {
    let UsetTocken = wx.getStorageSync(USER_TOKEN) || ''
    tip.loading();

    let data = (params.query || {});
    data.sign = SIGN;
    data.time = TIMESTAMP;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: { 'Content-Type': 'application/json' ,'auth-token':UsetTocken},
    });
    tip.loaded();
    if(res.statusCode!=200){
        tip.error('网络连接失败')
        return;
    }else{
        return res.data;
    }
   
};


module.exports = {
    wxRequest
}
