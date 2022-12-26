from flask import Flask, render_template, request
import pandas as pd
import joblib

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def blood_pressure_predictor():
    prediction = None
    if request.method == 'POST':
        age = request.form['age']
        weight = request.form['weight']

        print("Age: {} and Weight: {}".format(age, weight))
        clf = joblib.load("regr.pkl")
        x = pd.DataFrame([[age, weight ]], columns=["Age", "Weight"])
        prediction = str(clf.predict(x)[0])

    return render_template('blood_pressure_predictor.html', result=prediction)


if __name__ == '__main__':
   app.run(debug=True)