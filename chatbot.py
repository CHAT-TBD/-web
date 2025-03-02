from flask import Flask, request, jsonify
import json
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

# โหลดชุดข้อมูล
with open("chatbot_data.json", "r", encoding="utf-8") as f:
    dataset = json.load(f)

# Tokenizer
tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts([data["input"] for data in dataset] + [data["response"] for data in dataset])

# โหลดโมเดล
try:
    model = tf.keras.models.load_model("chatbot_model.h5")
    print("✅ โมเดลโหลดสำเร็จ!")
except Exception as e:
    print("❌ โหลดโมเดลล้มเหลว:", str(e))

max_length = 20  # ปรับให้ตรงกับตอนฝึกโมเดล

def get_response(text):
    seq = tokenizer.texts_to_sequences([text])
    seq = pad_sequences(seq, maxlen=max_length)
    prediction = model.predict(seq)
    response_idx = np.argmax(prediction)
    return dataset[response_idx]["response"]

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message", "")
        if not user_input:
            return jsonify({"response": "กรุณากรอกข้อความ"}), 400

        bot_response = get_response(user_input)
        return jsonify({"response": bot_response})

    except Exception as e:
        return jsonify({"response": "เกิดข้อผิดพลาด"}), 500

@app.route("/train", methods=["POST"])
def train():
    try:
        new_input = request.json.get("input")
        new_response = request.json.get("response")

        if not new_input or not new_response:
            return jsonify({"message": "ข้อมูลไม่ครบ"}), 400

        dataset.append({"input": new_input, "response": new_response})

        with open("chatbot_data.json", "w", encoding="utf-8") as f:
            json.dump(dataset, f, ensure_ascii=False, indent=4)

        return jsonify({"message": "บอทเรียนรู้คำตอบใหม่แล้ว!"})

    except Exception as e:
        return jsonify({"message": "เกิดข้อผิดพลาด"}), 500

if __name__ == "__main__":
    app.run(debug=True)
