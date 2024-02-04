/* eslint-disable no-underscore-dangle */
const SMOOTHING_FACTOR = 0.8;
// eslint-disable-next-line no-unused-vars
const MINIMUM_VALUE = 0.00001;
registerProcessor(
  'vumeter',
  class extends AudioWorkletProcessor {
    _volume;
    _updateIntervalInMS;
    _nextUpdateFrame;
    _currentTime;

    constructor() {
      super();
      this._volume = 0;
      this._updateIntervalInMS = 25;
      this._nextUpdateFrame = this._updateIntervalInMS;
      this._currentTime = 0;
      this.port.onmessage = (event) => {
        if (event.data.updateIntervalInMS) {
          this._updateIntervalInMS = event.data.updateIntervalInMS;
          // console.log(event.data.updateIntervalInMS);
        }
      };
    }

    get intervalInFrames() {
      // eslint-disable-next-line no-undef
      return (this._updateIntervalInMS / 1000) * sampleRate;
    }

    process(inputs, outputs, parameters) {
      const input = inputs[0];

      // Note that the input will be down-mixed to mono; however, if no inputs are
      // connected then zero channels will be passed in.
      if (0 < input.length) {
        const samples = input[0];
        let sum = 0;
        let rms = 0;

        // Calculated the squared-sum.
        for (let i = 0; i < samples.length; i += 1) {
          sum += samples[i] * samples[i];
        }

        // Calculate the RMS level and update the volume.
        rms = Math.sqrt(sum / samples.length);
        this._volume = Math.max(rms, this._volume * SMOOTHING_FACTOR);

        // Update and sync the volume property with the main thread.
        this._nextUpdateFrame -= samples.length;
        if (0 > this._nextUpdateFrame) {
          this._nextUpdateFrame += this.intervalInFrames;
          // const currentTime = currentTime ;
          // eslint-disable-next-line no-undef
          if (!this._currentTime || 0.125 < currentTime - this._currentTime) {
            // eslint-disable-next-line no-undef
            this._currentTime = currentTime;
            // console.log(`currentTime: ${currentTime}`);
            this.port.postMessage({ volume: this._volume });
          }
        }
      }

      return true;
    }
  },
);
