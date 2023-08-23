
class Base64 {
  static _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  static encode = (e) => {
    let t = '';
    let n, r, i, s, o, u, a;
    let f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
    }
    return t;
  };
  static decode = (e) => {
    let t = '';
    let n, r, i;
    let s, o, u, a;
    let f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  };
  static _utf8_encode = (e) => {
    e = e.replace(/\r\n/g, '\n');
    let t = '';
    for (let n = 0; n < e.length; n++) {
      let r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  };
  static _utf8_decode = (e) => {
    let t = '';
    let n = 0;
    // let c1 = 0
    let c2 = 0
    let r = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        let c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        n += 3;
      }
    }
    return t;
  };
}

const getDownloadConfig = () =>
  ((cfg) => {
    if (!cfg) return '';

    let i = 0;
    cfg.columnConfigurations =
      (cfg.columnConfiguration &&
        cfg.columnConfiguration
          .map((c) => {
            if (c.visible) {
              delete c.visible;
              delete c.defaultName;

              c.order = i;
              i++;
              return c;
            }
            return null;
          })
          .filter((c) => c !== null)) ||
      [];

    delete cfg.columnConfiguration;
    console.log("config: ", cfg)
    return JSON.stringify(cfg);
  })(JSON.parse(localStorage.getItem('downloadConfiguration')));

  const getWorkingReportExcelUrl = (userId, startDate, endDate, url) => {
    return `${process.env.REACT_APP_BASE_API}${url}${userId}&startDate=${startDate}&endDate=${endDate}&configuration=${Base64.encode(
      getDownloadConfig()
    )}`;
  }

  const getWorkingReportPdfUrl = (userId, startDate, endDate, url) => {
    return `${process.env.REACT_APP_BASE_API}${url}${userId}&startDate=${startDate}&endDate=${endDate}&configuration=${Base64.encode(
      getDownloadConfig()
    )}`;
  }

  export {
    getWorkingReportExcelUrl,
    getWorkingReportPdfUrl
  }