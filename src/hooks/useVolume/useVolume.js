import { reactive, ref, watch } from 'vue'
export default function useVolume(stream) {
    const volume = ref(0)
    const newRef = reactive({ current: {} })
    const onmessage = (event) => {
        if (!newRef.current.audioContext) {
            return;
        }
        if (event.data.volume) {
            volume.value = Math.round(event.data.volume * 200)
        }
    };
    const disconnectAudioContext = () => {
        if (newRef.current.node) {
            try {
                newRef.current.node.disconnect();
            } catch (errMsg) {
                // TODO: implementation pending
            }
        }
        if (newRef.current.source) {
            try {
                newRef.current.source.disconnect();
            } catch (errMsg) {
                // TODO: implementation pending
            }
        }
        newRef.current.node = null;
        newRef.current.source = null;
        newRef.current.audioContext = null;
        volume.value = 0
    }
    const connectAudioContext = async (mediaStream) => {
        if (newRef.current.audioContext) {
            disconnectAudioContext();
        }
        try {
            newRef.current.audioContext = new AudioContext();
            await newRef.current.audioContext.audioWorklet.addModule('./worklet/vumeter.js');
            if (!newRef.current.audioContext) {
                return;
            }
            newRef.current.source = newRef.current.audioContext.createMediaStreamSource(mediaStream);
            newRef.current.node = new AudioWorkletNode(newRef.current.audioContext, 'vumeter');
            newRef.current.node.port.onmessage = onmessage;
            newRef.current.source.connect(newRef.current.node).connect(newRef.current.audioContext.destination);
        } catch (errMsg) {
            disconnectAudioContext();
        }
    }
    // eslint-disable-next-line no-unused-vars
    watch(() => stream, (nVal, _oVal) => {
        if (!nVal) {
            return () => { };
        }
        connectAudioContext(nVal);
        return () => {
            disconnectAudioContext(nVal);
        };
    }, {
        immediate: true
    })

    return volume
}