import base64
  
sample_string = "https://1drv.ms/u/s!Ai0Pg9LfZQYbiNsvqrQjHdXne3OaLA?e=uBs6Lc"
#sample_string = "https://1drv.ms/f/s!AtuAM_NacwVahiFpuMGS_BiQCwWu"
sample_string_bytes = sample_string.encode("ascii")
  
base64_bytes = base64.b64encode(sample_string_bytes)
base64_string = base64_bytes.decode("ascii")
newLink = 'https://api.onedrive.com/v1.0/shares/u!{}/root?expand=children'.format(base64_string.replace('+', '-').replace('/','_'))
print(f"Encoded string: {base64_string}")
print(newLink)