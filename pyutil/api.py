import requests



def nlu(text):
    api_url = "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze"
    auth = ('48ecf36f-4359-4dcf-87ac-99480df20c98', 'dRGCkJQGzY7n')
    data = {
        "text": text,
        "version": "2017-02-27",
        "features": "sentiment",
    }

    ret = requests.get(api_url, params=data, auth=auth)
    return ret.json()

def text2speech(text):
    api_url = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize"
    auth = ("633214e0-75dc-41dc-b70c-051335b92583", "Z8FxXqbe3fAw")
    data = {
        "text": text,
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'audio/wav',
    }
    ret = requests.post(url=api_url, data=data, headers=headers, auth=auth)
    return ret.status_code

def speech2text(audioFilename):
    api_url = 'https://stream.watsonplatform.net/speech-to-text/api/v1/recognize'
    auth = ("649b5fa7-2fc9-4a03-ba51-936d66ffdd0b", "dI7PZXqM7ejt")
    headers = {
        'Content-Type': 'audio/wav',
    }
    data = open(audioFilename, 'rb').read()
    ret = requests.post(api_url, headers=headers, data=data, auth=auth)
    return ret.json()

def classifyImage(imageFilename):
    api_url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify'
    api_key = '6d6f0991070b739eff2c015cb7193f88e28896e9'

    params = (
        ('api_key', api_key),
        ('version', '2016-05-20'),
    )
    data = open(imageFilename, 'rb').read()

    ret = requests.post(api_url, params=params, data=data)
    return ret.json()

def detectingFaces(imageFilename):
    api_url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/detect_faces'
    api_key = '6d6f0991070b739eff2c015cb7193f88e28896e9'

    params = (
        ('api_key', api_key),
        ('version', '2016-05-20'),
    )
    data = open(imageFilename, 'rb').read()
    ret = requests.post(api_url, params=params, data=data)
    return ret.json()

def personalInsight(text):
    api_url = 'https://gateway.watsonplatform.net/personality-insights/api/v3/profile'
    auth = ('cc9a4bfe-9c09-4407-8618-d18ef6271fbd', 'jy7op5MHFDbi')

    headers = {
        'Content-Type': 'text/plain'
    }

    params = {
        'version':'2017-10-13'
    }

    print (text)
    # data = open(textFilename, 'r', encoding='utf-8').read()
    ret = requests.post(api_url, params=params, data=text, headers=headers, auth=auth)

    return ret.json()


if __name__ == '__main__':
    print(nlu('Understand the contents of images. Create custom classifiers to develop smart applications'))
    # print(speech2text('hello_world.wav'))
    # print(classifyImage('test.jpg'))
    # print(detectingFaces('test.jpg'))
    print(personalInsight("En Grecia 🇬🇷, ¡mañana vuelve la UEFA Champions League\nDesayunando con ellos.\nPartido difícil en San Mamés. Tuvimos que pelear muchísimo para ganar hoy a un gran rival. \nHoy estuvimos en Londres para los 'The Best FIFA Football Awards2017'. Felicidades a todos los ganadores.\n¡Era importante sumar 3 puntos más hoy y lo logramos!\nEn la App podés acompañarme en todos mis partidos. ¿Ya la tenés?\nOtro paso más hacia adelante en la Champions.\nArrancamos la semana preparando nuestro próximo partido de UEFA Champions League.\nOrgulloso de ser embajador para Tour n Cure, un programa global que arrancó en Egipto para erradicar la #HepatitisC1# del mundo. Gracias al trabajo realizado hasta hoy se han curado más de un millón de personas, las cuales llevaban más de dos años esperando el tratamiento para es ​​​​..".encode('utf-8')))