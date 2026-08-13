
class AudioProcessor extends AudioWorkletProcessor {
  /**
   * @param {Float32Array[][]} inputs
   * @param {Float32Array[][]} outputs
   * @param {Record<string, Float32Array>} parameters
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input.length > 0) {
      const channelData = input[0];
      // Convert Float32 [-1.0, 1.0] to Int16 [-32768, 32767]
      const pcm16 = new Int16Array(channelData.length);
      for (let i = 0; i < channelData.length; i++) {
        let s = Math.max(-1, Math.min(1, channelData[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      // Send PCM data back to the main thread
      this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
    }
    // Return true to keep the processor alive
    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
