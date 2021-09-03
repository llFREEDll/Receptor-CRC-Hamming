# Receptor-CRC-Hamming
algoritmo para recibir tramas y desencriptarlas por CRC y Hamming 
# How does it work?
 ### This form receives three values

- The first is a sequence of bits that represent a character that simulates being received, as if it were sent over the network, this is treated by the Hamming code and by the CRC verification, for more information about these algorithms you can visit the following links: [CRC](https://youtu.be/rB9aL1e3agw) , [Hamming](https://youtu.be/gQK9nROFX20).

In turn, this code can be generated with the [CRC Hamming Emitter](https://llfreedll.github.io/Emisor-CRC-Hamming/), which is a project built alongside it.

The purpose of this first piece of information is to receive a frame with a bit changed (a "1" for a "0", for example) and the algorithm will take care of correcting the wrong bit and giving the correct result.

- The second value receives a polynomial in binary, better known as a key, with which the message is encrypted and the message itself is in charge of decrypting.

- The third value defines the parity if it is even or odd, this tells us if the active bits in the frame, the numbers "1", that were sent are even or odd.

NOTE: If more than one bit is altered, this error detection method does not work.
