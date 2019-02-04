import React from 'react'
import GL from '@luma.gl/constants';
import {addEvents} from 'luma.gl/addons';
import {AnimationLoop, setParameters, Sphere, Texture2D} from 'luma.gl';
import {loadImage} from '@loaders.gl/core';
import {Vector3, Matrix4} from 'math.gl';
import moon_file from "./moon.gif"

const VERTEX_SHADER = `\
attribute vec3 positions;
attribute vec3 normals;
attribute vec2 texCoords;

uniform mat4 uMMatrix;
uniform mat4 uVMatrix;
uniform mat4 uPMatrix;

uniform vec3 uAmbientColor;

uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;

uniform bool uUseLighting;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void) {
    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(positions, 1.0);
    vTextureCoord = texCoords;

    if (!uUseLighting) {
        vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else {
        vec4 transformedNormal = uMMatrix * vec4(normals, 1.0);
        vec3 newNormal = transformedNormal.xyz / transformedNormal.w;
        float directionalLightWeighting = max(dot(newNormal, uLightingDirection), 0.0);
        vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
}
`;

const FRAGMENT_SHADER = `\
precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D uSampler;

void main(void) {
  vec4 textureColor = texture2D(uSampler, vec2(1.0 - vTextureCoord.s, 1.0 - vTextureCoord.t));
  gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
`;


const appState = {
    mouseDown: false,
    lastMouseX: null,
    lastMouseY: null,
    moonRotationMatrix: new Matrix4()
};

let texture = null;

class Luma extends React.Component {
    constructor(props) {
        super(props);
        this.ref =  React.createRef();

    }
    componentDidMount() {
        const m = this
        const animationLoop = new AnimationLoop({
            onInitialize({canvas, gl}) {
                m.addMouseHandler(canvas);

                setParameters(gl, {
                    clearColor: [0, 0, 0, 1],
                    clearDepth: 1,
                    depthTest: true
                });

                loadImage(moon_file).then((t) => {
                   texture =  new Texture2D(gl,{ data:t});
                });

                return {
                    moon: new Sphere(gl, {
                        fs: FRAGMENT_SHADER,
                        vs: VERTEX_SHADER,
                        nlat: 30,
                        nlong: 30,
                        radius: 2,
                    })
                };
            },

            // eslint-disable-next-line complexity
            onRender({gl, tick, aspect, moon}) {
                // Update Camera Position
                const eyePos = [0, 0, 6];

                gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

                const uMMatrix = new Matrix4().multiplyRight(appState.moonRotationMatrix);
                const uVMatrix = new Matrix4().lookAt({eye: eyePos, center: [0, 0, 0], up:[0, 1, 0]});

                // Read controls
                const {lighting, ambientColor, lightingDirection, directionalColor} = m.getControlValues();

                moon.setUniforms({uUseLighting: lighting,uSampler:texture});

                if (lighting) {
                    lightingDirection.normalize();
                    lightingDirection.scale(-1);

                    moon.setUniforms({
                        uAmbientColor: ambientColor,
                        uLightingDirection: lightingDirection,
                        uDirectionalColor: directionalColor
                    });
                }

                moon.render({
                    uMMatrix,
                    uVMatrix,
                    uPMatrix: new Matrix4().perspective({fov: 45 * Math.PI / 180, aspect, near: 0.1, far: 100})
                });
            }
        });
        animationLoop.getInfo = () => INFO_HTML;
        animationLoop.start({canvas: this.ref.current})

    }

    addMouseHandler(canvas) {
        addEvents(canvas, {
            onDragStart(event) {
                appState.mouseDown = true;
                appState.lastMouseX = event.clientX;
                appState.lastMouseY = event.clientY;
            },
            onDragMove(event) {
                if (!appState.mouseDown) {
                    return;
                }

                if (appState.lastMouseX !== undefined) {
                    const radiansX = (event.x - appState.lastMouseX) / 300;
                    const radiansY = -(event.y - appState.lastMouseY) / 300;

                    const newMatrix = new Matrix4()
                        .rotateX(radiansY)
                        .rotateY(radiansX);

                    appState.moonRotationMatrix.multiplyLeft(newMatrix);
                }

                appState.lastMouseX = event.x;
                appState.lastMouseY = event.y;
            },

            onDragEnd(e) {
                appState.mouseDown = false;
            }
        });
    }
    getControlValues() {

        const lighting = true;

        const ambientColor =  new Vector3(0.2,0.2,0.2);
        const lightingDirection = new Vector3(-1,-1,-1);
        const directionalColor =  new Vector3(0.8,0.8,0.8);

        return {lighting, ambientColor, lightingDirection, directionalColor};
    }
    render() {
        return (<canvas ref={this.ref}  width={500} height={500}></canvas>)
    }

}
export default Luma