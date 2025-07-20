/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
// 23FI101*深田 琢磨


class ThreeJSContainer {
    scene;
    light;
    cloud;
    particleVelocity;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        let generateSprite = () => {
            // 新しいキャンバスの作成
            let canvas = document.createElement('canvas');
            canvas.width = 25;
            canvas.height = 25;
            // 円形のグラデーションの作成
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(0, 255,255,1)'); // 中心にシアンを指定
            gradient.addColorStop(0.4, 'rgba(0, 0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            // テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_1__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        let createParticles2 = () => {
            // ジオメトリの作成
            const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
            // マテリアルの作成
            const material = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
                size: 1, transparent: true, blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
                depthWrite: false,
                map: generateSprite()
            });
            // particleの作成
            const particleNum = 100; // パーティクルの数
            const positions = new Float32Array(particleNum * 3);
            let particleIndex = 0;
            this.particleVelocity = [];
            for (let i = 0; i < particleNum; i++) {
                positions[particleIndex++] = 10 * Math.random() - 5; // x座標
                positions[particleIndex++] = 10 * Math.random() - 5; // y座標
                positions[particleIndex++] = 10 * Math.random() - 5; // z座標
                this.particleVelocity.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0.0, -Math.random() * 1.0 - 0.1, 0.0));
            }
            geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
            // THREE.Pointsの作成
            this.cloud = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geometry, material);
            // シーンへの追加
            this.scene.add(this.cloud);
        };
        createParticles2();
        // --ロケット上部↓-----------------------------------------------------------------
        let point = [];
        let pointNum = 2.5;
        let plus = 0.1; // 点の間隔を左右する係数
        for (let i = 0; i <= pointNum; i += plus) {
            let x = 1 / Math.exp(i); // 逆数にすることでホーン形状に
            let y = i; // マイナスを外し、ホーンの向きを調整
            point.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(x, y));
        }
        // Geometryの生成
        let latheGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.LatheGeometry(point);
        // Materialの生成
        let latheMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial({ side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        // オブジェクトの生成
        let latheMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(latheGeometry, latheMaterial);
        // --ロケット上部↑-----------------------------------------------------------------
        // --翼↓-----------------------------------------------------------------
        let drawShape1 = () => {
            // THREE.Shapeを作成
            let shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            // 形状を定義 
            shape.moveTo(1, 1);
            shape.lineTo(1, -1);
            shape.quadraticCurveTo(0, -2, -1, -1);
            let hole = new three__WEBPACK_IMPORTED_MODULE_1__.Path();
            hole.absellipse(0.2, -0.5, 0.25, 0.25, 0, Math.PI * 2, false, 0);
            shape.holes.push(hole);
            return shape;
        };
        let drawShape2 = () => {
            // THREE.Shapeを作成
            let shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            // 形状を定義 
            shape.moveTo(1, 1);
            shape.lineTo(1, -1);
            shape.quadraticCurveTo(0, -2, -1, -1);
            let hole = new three__WEBPACK_IMPORTED_MODULE_1__.Path();
            hole.absellipse(0.2, -0.5, 0.25, 0.25, 0, Math.PI * 2, false, 0);
            shape.holes.push(hole);
            return shape;
        };
        // プロパティの設定
        let extrudeSettings = {
            steps: 1,
            depth: 0.1,
            bevelEnabled: false,
            bevelThickness: 4,
            bevelSize: 2,
            bevelSegments: 3
        };
        // Geometryの生成
        let shapeGeometry1 = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawShape1(), extrudeSettings); // 翼1
        let shapeGeometry2 = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawShape2(), extrudeSettings); // 翼2
        // Materialの生成
        let meshMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        // オブジェクトの生成
        let mesh1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(shapeGeometry1, meshMaterial); // 翼1
        let mesh2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(shapeGeometry2, meshMaterial); // 翼2
        // 翼1位置調整
        mesh1.position.x = -2;
        mesh1.position.z = -2;
        // 翼2位置調整
        mesh2.position.x = 2;
        mesh2.rotation.y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(180); // Y軸反転
        mesh2.position.z = -2;
        // --翼↑-----------------------------------------------------------------
        // --本体↓-----------------------------------------------------------------
        // Geometryの生成
        let addObjectGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(1, 1, 4); //追加分
        // Materialの生成
        let meshMaterial2 = new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial({ side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        // オブジェクトの生成
        let addObject = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(addObjectGeometry, meshMaterial2);
        // 本体の位置調整
        addObject.position.z = -2;
        // --本体↑-----------------------------------------------------------------
        // 向き調整
        mesh1.rotation.x = Math.PI / 2;
        mesh2.rotation.x = Math.PI / 2;
        latheMesh.rotation.x = Math.PI / 2;
        addObject.rotation.x = Math.PI / 2;
        // グループに追加
        let group = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        group.add(mesh1);
        group.add(mesh2);
        group.add(latheMesh);
        group.add(addObject);
        // サイズ調整
        group.scale.set(0.3, 0.3, 0.3);
        // ロケットをシーンへ追加
        this.scene.add(group);
        // ベジエ曲線の関数
        let bezier = (p0, p1, p2, p3, t) => {
            const result = p0.clone().multiplyScalar((1 - t) * (1 - t) * (1 - t)).clone().add(p1.clone().multiplyScalar(3 * t * (1 - t) * (1 - t))).clone().add(p2.clone().multiplyScalar(3 * t * t * (1 - t))).clone().add(p3.clone().multiplyScalar((t * t * t))); // Bezier曲線を実装する
            return result;
        };
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        let points = [];
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-8, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-7, 0, -3));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-5, 0, -4));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-4, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-4, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-3, 0, 4));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 3));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, -3));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, -4));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, -2));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, -2));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(7, 0, 3));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(8, 0, 0));
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
        let t = 0;
        let seg = 0;
        let update = (time) => {
            t += clock.getDelta();
            if (t > 1.0) {
                seg++;
                if (seg >= points.length / 4) {
                    seg = 0;
                }
                t -= 1.0;
            }
            const pos = bezier(points[seg * 4 + 0], points[seg * 4 + 1], points[seg * 4 + 2], points[seg * 4 + 3], t);
            group.lookAt(pos); // ロケットを進行方向に向かせる
            group.position.copy(pos);
            const deltaTime = clock.getDelta();
            const geom = this.cloud.geometry;
            const positions = geom.getAttribute('position'); //座標データ
            for (let i = 0; i < positions.count; i++) {
                positions.setX(i, positions.getX(i) + this.particleVelocity[i].x * deltaTime);
                positions.setY(i, positions.getY(i) + this.particleVelocity[i].y * deltaTime);
                positions.setZ(i, positions.getZ(i) + this.particleVelocity[i].z * deltaTime);
                if (positions.getY(i) < -25) { // yの値が-25よりも小さくなったら各座標を再配置し、継続的に雨が降っているように見せる。
                    positions.setX(i, 10 * Math.random() - 5); // x座標を再配置
                    positions.setY(i, 10 * Math.random() + 5); // y座標を再配置
                    positions.setZ(i, 10 * Math.random() - 5); // z座標を再配置
                }
            }
            positions.needsUpdate = true;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 5));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksMENB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akY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMjNGSTEwMSrmt7HnlLAg55Ci56OoXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBjbG91ZDogVEhSRUUuUG9pbnRzO1xuICAgIHByaXZhdGUgcGFydGljbGVWZWxvY2l0eTogVEhSRUUuVmVjdG9yM1tdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIGxldCBnZW5lcmF0ZVNwcml0ZSA9ICgpID0+IHsgLy8g55m66KGM44GZ44KL54K5XG4gICAgICAgICAgICAvLyDmlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDI1O1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDI1O1xuXG4gICAgICAgICAgICAvLyDlhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMCwgMjU1LDI1NSwxKScpOyAvLyDkuK3lv4PjgavjgrfjgqLjg7PjgpLmjIflrppcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsICdyZ2JhKDAsIDAsNjQsMSknKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwxKScpO1xuXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgLy8g44OG44Kv44K544OB44Oj44Gu55Sf5oiQXG4gICAgICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNyZWF0ZVBhcnRpY2xlczIgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyDjgrjjgqrjg6Hjg4jjg6rjga7kvZzmiJBcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgICAgICAvLyDjg57jg4bjg6rjgqLjg6vjga7kvZzmiJBcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBzaXplOiAxLCB0cmFuc3BhcmVudDogdHJ1ZSwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gcGFydGljbGXjga7kvZzmiJBcbiAgICAgICAgICAgIGNvbnN0IHBhcnRpY2xlTnVtID0gMTAwOyAvLyDjg5Hjg7zjg4bjgqPjgq/jg6vjga7mlbBcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZUluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVWZWxvY2l0eSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IDEwICogTWF0aC5yYW5kb20oKSAtIDU7IC8vIHjluqfmqJlcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IDEwICogTWF0aC5yYW5kb20oKSAtIDU7IC8vIHnluqfmqJlcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IDEwICogTWF0aC5yYW5kb20oKSAtIDU7IC8vIHrluqfmqJlcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlVmVsb2NpdHkucHVzaChuZXcgVEhSRUUuVmVjdG9yMygwLjAsIC1NYXRoLnJhbmRvbSgpICogMS4wIC0gMC4xLCAwLjApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG4gICAgICAgICAgICAvLyBUSFJFRS5Qb2ludHPjga7kvZzmiJBcbiAgICAgICAgICAgIHRoaXMuY2xvdWQgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgICAgICAvLyDjgrfjg7zjg7Pjgbjjga7ov73liqBcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY2xvdWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlUGFydGljbGVzMigpO1xuXG4gICAgICAgIC8vIC0t44Ot44Kx44OD44OI5LiK6YOo4oaTLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbGV0IHBvaW50OiBUSFJFRS5WZWN0b3IyW10gPSBbXTtcblxuICAgICAgICBsZXQgcG9pbnROdW0gPSAyLjU7XG4gICAgICAgIGxldCBwbHVzID0gMC4xOyAvLyDngrnjga7plpPpmpTjgpLlt6blj7PjgZnjgovkv4LmlbBcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBwb2ludE51bTsgaSArPSBwbHVzKSB7XG4gICAgICAgICAgICBsZXQgeCA9IDEgLyBNYXRoLmV4cChpKTsgLy8g6YCG5pWw44Gr44GZ44KL44GT44Go44Gn44Ob44O844Oz5b2i54q244GrXG4gICAgICAgICAgICBsZXQgeSA9IGk7IC8vIOODnuOCpOODiuOCueOCkuWkluOBl+OAgeODm+ODvOODs+OBruWQkeOBjeOCkuiqv+aVtFxuICAgICAgICAgICAgcG9pbnQucHVzaChuZXcgVEhSRUUuVmVjdG9yMih4LCB5KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2VvbWV0cnnjga7nlJ/miJBcbiAgICAgICAgbGV0IGxhdGhlR2VvbWV0cnkgPSBuZXcgVEhSRUUuTGF0aGVHZW9tZXRyeShwb2ludCk7XG4gICAgICAgIC8vIE1hdGVyaWFs44Gu55Sf5oiQXG4gICAgICAgIGxldCBsYXRoZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCh7IHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIC8vIOOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxuICAgICAgICBsZXQgbGF0aGVNZXNoID0gbmV3IFRIUkVFLk1lc2gobGF0aGVHZW9tZXRyeSwgbGF0aGVNYXRlcmlhbCk7XG4gICAgICAgIC8vIC0t44Ot44Kx44OD44OI5LiK6YOo4oaRLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLyAtLee/vOKGky0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGxldCBkcmF3U2hhcGUxID0gKCkgPT4geyAvLyDnv7wxXG4gICAgICAgICAgICAvLyBUSFJFRS5TaGFwZeOCkuS9nOaIkFxuICAgICAgICAgICAgbGV0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG5cbiAgICAgICAgICAgIC8vIOW9oueKtuOCkuWumue+qSBcbiAgICAgICAgICAgIHNoYXBlLm1vdmVUbygxLCAxKTtcbiAgICAgICAgICAgIHNoYXBlLmxpbmVUbygxLCAtMSk7XG4gICAgICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKDAsIC0yLCAtMSwgLTEpO1xuXG4gICAgICAgICAgICBsZXQgaG9sZSA9IG5ldyBUSFJFRS5QYXRoKCk7XG4gICAgICAgICAgICBob2xlLmFic2VsbGlwc2UoMC4yLCAtMC41LCAwLjI1LCAwLjI1LCAwLCBNYXRoLlBJICogMiwgZmFsc2UsIDApO1xuICAgICAgICAgICAgc2hhcGUuaG9sZXMucHVzaChob2xlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkcmF3U2hhcGUyID0gKCkgPT4geyAvLyDnv7wyXG4gICAgICAgICAgICAvLyBUSFJFRS5TaGFwZeOCkuS9nOaIkFxuICAgICAgICAgICAgbGV0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG5cbiAgICAgICAgICAgIC8vIOW9oueKtuOCkuWumue+qSBcbiAgICAgICAgICAgIHNoYXBlLm1vdmVUbygxLCAxKTtcbiAgICAgICAgICAgIHNoYXBlLmxpbmVUbygxLCAtMSk7XG4gICAgICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKDAsIC0yLCAtMSwgLTEpO1xuXG4gICAgICAgICAgICBsZXQgaG9sZSA9IG5ldyBUSFJFRS5QYXRoKCk7XG4gICAgICAgICAgICBob2xlLmFic2VsbGlwc2UoMC4yLCAtMC41LCAwLjI1LCAwLjI1LCAwLCBNYXRoLlBJICogMiwgZmFsc2UsIDApO1xuICAgICAgICAgICAgc2hhcGUuaG9sZXMucHVzaChob2xlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICB9XG4gICAgICAgIC8vIOODl+ODreODkeODhuOCo+OBruioreWumlxuICAgICAgICBsZXQgZXh0cnVkZVNldHRpbmdzID0ge1xuICAgICAgICAgICAgc3RlcHM6IDEsXG4gICAgICAgICAgICBkZXB0aDogMC4xLFxuICAgICAgICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJldmVsVGhpY2tuZXNzOiA0LFxuICAgICAgICAgICAgYmV2ZWxTaXplOiAyLFxuICAgICAgICAgICAgYmV2ZWxTZWdtZW50czogM1xuICAgICAgICB9O1xuICAgICAgICAvLyBHZW9tZXRyeeOBrueUn+aIkFxuICAgICAgICBsZXQgc2hhcGVHZW9tZXRyeTEgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KGRyYXdTaGFwZTEoKSwgZXh0cnVkZVNldHRpbmdzKSAvLyDnv7wxXG4gICAgICAgIGxldCBzaGFwZUdlb21ldHJ5MiA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkoZHJhd1NoYXBlMigpLCBleHRydWRlU2V0dGluZ3MpIC8vIOe/vDJcbiAgICAgICAgLy8gTWF0ZXJpYWzjga7nlJ/miJBcbiAgICAgICAgbGV0IG1lc2hNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIC8vIOOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxuICAgICAgICBsZXQgbWVzaDEgPSBuZXcgVEhSRUUuTWVzaChzaGFwZUdlb21ldHJ5MSwgbWVzaE1hdGVyaWFsKTsgLy8g57+8MVxuICAgICAgICBsZXQgbWVzaDIgPSBuZXcgVEhSRUUuTWVzaChzaGFwZUdlb21ldHJ5MiwgbWVzaE1hdGVyaWFsKTsgLy8g57+8MlxuICAgICAgICAvLyDnv7wx5L2N572u6Kq/5pW0XG4gICAgICAgIG1lc2gxLnBvc2l0aW9uLnggPSAtMjtcbiAgICAgICAgbWVzaDEucG9zaXRpb24ueiA9IC0yO1xuICAgICAgICAvLyDnv7wy5L2N572u6Kq/5pW0XG4gICAgICAgIG1lc2gyLnBvc2l0aW9uLnggPSAyO1xuICAgICAgICBtZXNoMi5yb3RhdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKDE4MCk7IC8vIFnou7jlj43ou6JcbiAgICAgICAgbWVzaDIucG9zaXRpb24ueiA9IC0yO1xuICAgICAgICAvLyAtLee/vOKGkS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy8gLS3mnKzkvZPihpMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyBHZW9tZXRyeeOBrueUn+aIkFxuICAgICAgICBsZXQgYWRkT2JqZWN0R2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMSwgMSwgNCk7Ly/ov73liqDliIZcbiAgICAgICAgLy8gTWF0ZXJpYWzjga7nlJ/miJBcbiAgICAgICAgbGV0IG1lc2hNYXRlcmlhbDI6IFRIUkVFLk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCh7IHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIC8vIOOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxuICAgICAgICBsZXQgYWRkT2JqZWN0OiBUSFJFRS5NZXNoID0gbmV3IFRIUkVFLk1lc2goYWRkT2JqZWN0R2VvbWV0cnksIG1lc2hNYXRlcmlhbDIpO1xuICAgICAgICAvLyDmnKzkvZPjga7kvY3nva7oqr/mlbRcbiAgICAgICAgYWRkT2JqZWN0LnBvc2l0aW9uLnogPSAtMjtcbiAgICAgICAgLy8gLS3mnKzkvZPihpEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vIOWQkeOBjeiqv+aVtFxuICAgICAgICBtZXNoMS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIG1lc2gyLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgbGF0aGVNZXNoLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgYWRkT2JqZWN0LnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG4gICAgICAgIGxldCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBncm91cC5hZGQobWVzaDEpO1xuICAgICAgICBncm91cC5hZGQobWVzaDIpO1xuICAgICAgICBncm91cC5hZGQobGF0aGVNZXNoKTtcbiAgICAgICAgZ3JvdXAuYWRkKGFkZE9iamVjdCk7XG4gICAgICAgIC8vIOOCteOCpOOCuuiqv+aVtFxuICAgICAgICBncm91cC5zY2FsZS5zZXQoMC4zLCAwLjMsIDAuMyk7XG4gICAgICAgIC8vIOODreOCseODg+ODiOOCkuOCt+ODvOODs+OBuOi/veWKoFxuICAgICAgICB0aGlzLnNjZW5lLmFkZChncm91cCk7XG5cbiAgICAgICAgLy8g44OZ44K444Ko5puy57ea44Gu6Zai5pWwXG4gICAgICAgIGxldCBiZXppZXIgPSAocDA6IFRIUkVFLlZlY3RvcjMsIHAxOiBUSFJFRS5WZWN0b3IzLFxuICAgICAgICAgICAgcDI6IFRIUkVFLlZlY3RvcjMsIHAzOiBUSFJFRS5WZWN0b3IzLCB0OiBudW1iZXIpOiAoVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcDAubXVsdGlwbHlTY2FsYXIoKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpKS5hZGQoXG4gICAgICAgICAgICAgICAgcDEubXVsdGlwbHlTY2FsYXIoMyAqIHQgKiAoMSAtIHQpICogKDEgLSB0KSkpLmFkZChcbiAgICAgICAgICAgICAgICAgICAgcDIubXVsdGlwbHlTY2FsYXIoMyAqIHQgKiB0ICogKDEgLSB0KSkpLmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHAzLm11bHRpcGx5U2NhbGFyKCh0ICogdCAqIHQpKSkgLy8gQmV6aWVy5puy57ea44KS5a6f6KOF44GZ44KLXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgY29uc3QgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cbiAgICAgICAgbGV0IHBvaW50czogVEhSRUUuVmVjdG9yM1tdID0gW11cbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoLTgsIDAsIDApKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoLTcsIDAsIC0zKSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKC01LCAwLCAtNCkpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtNCwgMCwgMCkpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtNCwgMCwgMCkpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtMywgMCwgNCkpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMykpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgLTMpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgLTQpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgLTIpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgLTIpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgMCkpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMyg3LCAwLCAzKSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDgsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgIGxldCBzZWcgPSAwO1xuXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHQgKz0gY2xvY2suZ2V0RGVsdGEoKTtcblxuICAgICAgICAgICAgaWYgKHQgPiAxLjApIHtcbiAgICAgICAgICAgICAgICBzZWcrKztcbiAgICAgICAgICAgICAgICBpZiAoc2VnID49IHBvaW50cy5sZW5ndGggLyA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHQgLT0gMS4wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBiZXppZXIocG9pbnRzW3NlZyAqIDQgKyAwXSwgcG9pbnRzW3NlZyAqIDQgKyAxXSwgcG9pbnRzW3NlZyAqIDQgKyAyXSwgcG9pbnRzW3NlZyAqIDQgKyAzXSwgdCk7XG5cbiAgICAgICAgICAgIGdyb3VwLmxvb2tBdChwb3MpOyAvLyDjg63jgrHjg4Pjg4jjgpLpgLLooYzmlrnlkJHjgavlkJHjgYvjgZvjgotcbiAgICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLmNvcHkocG9zKTtcblxuICAgICAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gY2xvY2suZ2V0RGVsdGEoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2VvbSA9IDxUSFJFRS5CdWZmZXJHZW9tZXRyeT50aGlzLmNsb3VkLmdlb21ldHJ5O1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zID0gZ2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7IC8v5bqn5qiZ44OH44O844K/XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFgoaSwgcG9zaXRpb25zLmdldFgoaSkgKyB0aGlzLnBhcnRpY2xlVmVsb2NpdHlbaV0ueCAqIGRlbHRhVGltZSk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFkoaSwgcG9zaXRpb25zLmdldFkoaSkgKyB0aGlzLnBhcnRpY2xlVmVsb2NpdHlbaV0ueSAqIGRlbHRhVGltZSk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFooaSwgcG9zaXRpb25zLmdldFooaSkgKyB0aGlzLnBhcnRpY2xlVmVsb2NpdHlbaV0ueiAqIGRlbHRhVGltZSk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5nZXRZKGkpIDwgLTI1KSB7IC8vIHnjga7lgKTjgYwtMjXjgojjgorjgoLlsI/jgZXjgY/jgarjgaPjgZ/jgonlkITluqfmqJnjgpLlho3phY3nva7jgZfjgIHntpnntprnmoTjgavpm6jjgYzpmY3jgaPjgabjgYTjgovjgojjgYbjgavopovjgZvjgovjgIJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFgoaSwgMTAgKiBNYXRoLnJhbmRvbSgpIC0gNSk7IC8vIHjluqfmqJnjgpLlho3phY3nva5cbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFkoaSwgMTAgKiBNYXRoLnJhbmRvbSgpICsgNSk7IC8vIHnluqfmqJnjgpLlho3phY3nva5cbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFooaSwgMTAgKiBNYXRoLnJhbmRvbSgpIC0gNSk7IC8vIHrluqfmqJnjgpLlho3phY3nva5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3NpdGlvbnMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgNSkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=