# Tensorflow Python Models
Deep-Physics was trained on different model architecture to determine the optimal way of generating physics.

### DNN
DNN is a typical keras Deep Neural Network trained on Newtonian physics.

### GAN
GAN is a keras GAN trained on Newtonian physics.

# Note
Generated h5 neural networks can be converted using the following tensorflowjs bash command

```
tensorflowjs_converter --input_format keras path/to/my_model.h5 path/to/tfjs_target_dir
```