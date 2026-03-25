app.directive("aboutSection", function () {
  return {
    restrict: "E",
    templateUrl: "/admin/views/about.html",
    controller: function ($scope, $http, AuthService, $timeout) {
      var aboutId = null;
      var educationItems = [];
      var currentProfilePhoto = "";
      var currentResume = "";
      var editEducationIndex = null;

      function authHeaders() {
        var token = AuthService.getToken();
        return token ? { Authorization: "Bearer " + token } : {};
      }

      function byId(id) {
        return document.getElementById(id);
      }

      function showToast(message, isError) {
        var toast = byId("toast");
        var toastMessage = byId("toastMessage");
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.remove("hidden", "bg-emerald-600", "bg-red-600");
        toast.classList.add(isError ? "bg-red-600" : "bg-emerald-600");

        setTimeout(function () {
          toast.classList.add("hidden");
        }, 2500);
      }

      function updateLastUpdated() {
        var el = byId("lastUpdated");
        if (el) {
          el.textContent = "Last updated: " + new Date().toLocaleString();
        }
      }

      function updateCharCount() {
        var textArea = byId("aboutDescription");
        var charCount = byId("charCount");
        if (!textArea || !charCount) return;
        charCount.textContent = textArea.value.length;
      }

      function openEducationModal(index) {
        var modal = byId("educationModal");
        var title = byId("modalTitle");
        var inputTitle = byId("modalTitle_input");
        var inputDuration = byId("modalDuration");
        var inputLocation = byId("modalLocation");
        var inputPercentage = byId("modalPercentage");

        if (!modal || !title || !inputTitle || !inputDuration || !inputLocation || !inputPercentage) return;

        editEducationIndex = typeof index === "number" ? index : null;
        var item = editEducationIndex !== null ? educationItems[editEducationIndex] : null;

        title.textContent = item ? "Edit Education" : "Add Education";
        inputTitle.value = item ? item.title || "" : "";
        inputDuration.value = item ? item.duration || "" : "";
        inputLocation.value = item ? item.location || "" : "";
        inputPercentage.value = item ? item.percentage || "" : "";

        modal.classList.remove("hidden");
      }

      function closeEducationModal() {
        var modal = byId("educationModal");
        if (modal) {
          modal.classList.add("hidden");
        }
        editEducationIndex = null;
      }

      function renderEducation() {
        var list = byId("educationList");
        if (!list) return;

        if (!educationItems.length) {
          list.innerHTML = '<p class="text-sm text-gray-500">No education records added yet.</p>';
          return;
        }

        list.innerHTML = educationItems
          .map(function (item, index) {
            return (
              '<div class="border border-gray-700 rounded-lg p-4 flex items-start justify-between gap-4">' +
              '<div>' +
              '<p class="font-semibold text-white">' + (item.title || "") + "</p>" +
              '<p class="text-sm text-gray-400">' + (item.duration || "") + "</p>" +
              '<p class="text-sm text-gray-500">' + (item.location || "") + (item.percentage ? " • " + item.percentage : "") + "</p>" +
              "</div>" +
              '<div class="flex gap-2">' +
              '<button type="button" data-edit-index="' + index + '" class="px-3 py-1 text-sm border border-gray-600 rounded text-gray-300 hover:bg-gray-800">Edit</button>' +
              '<button type="button" data-delete-index="' + index + '" class="px-3 py-1 text-sm border border-red-500 rounded text-red-400 hover:bg-red-500/10">Delete</button>' +
              "</div>" +
              "</div>"
            );
          })
          .join("");
      }

      function setImagePreview(url) {
        var imagePreview = byId("imagePreview");
        var removeBtn = byId("removeImageBtn");
        if (!imagePreview || !removeBtn) return;

        if (url) {
          imagePreview.innerHTML = '<img src="' + url + '" alt="Profile" class="w-full h-full object-cover" />';
          removeBtn.style.display = "inline-block";
        } else {
          imagePreview.innerHTML =
            '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>';
          removeBtn.style.display = "none";
        }
      }

      function fillForm(about) {
        byId("fullName").value = about.name || "";
        byId("professionalTitle").value = about.title || "";
        byId("tagline").value = about.tagLine || "";
        byId("email").value = about.email || "";
        byId("location").value = about.location || "";
        byId("aboutDescription").value = about.description || "";
        byId("githubUrl").value = about.github || "";
        byId("linkedinUrl").value = about.linkedin || "";
        byId("instagramUrl").value = about.instagram || "";

        currentProfilePhoto = about.profilePhoto || "";
        currentResume = about.resume || "";
        educationItems = Array.isArray(about.education) ? about.education : [];

        var resumeFileName = byId("resumeFileName");
        var downloadResumeBtn = byId("downloadResumeBtn");
        if (resumeFileName) {
          resumeFileName.textContent = currentResume || "No resume uploaded";
        }
        if (downloadResumeBtn) {
          downloadResumeBtn.style.display = currentResume ? "inline-block" : "none";
        }

        setImagePreview(currentProfilePhoto);
        updateCharCount();
        renderEducation();
      }

      function getPayload() {
        return {
          name: byId("fullName").value.trim(),
          title: byId("professionalTitle").value.trim(),
          tagLine: byId("tagline").value.trim(),
          email: byId("email").value.trim(),
          location: byId("location").value.trim(),
          description: byId("aboutDescription").value.trim(),
          github: byId("githubUrl").value.trim(),
          linkedin: byId("linkedinUrl").value.trim(),
          instagram: byId("instagramUrl").value.trim(),
          profilePhoto: currentProfilePhoto,
          resume: currentResume,
          education: educationItems
        };
      }

      function validateRequired(payload) {
        return payload.name && payload.title && payload.tagLine && payload.email && payload.location && payload.description;
      }

      function loadAbout() {
        $http
          .get(BASE_URL + "about", { headers: authHeaders() })
          .then(function (response) {
            if (response.data) {
              aboutId = response.data._id || null;
              fillForm(response.data);
            }
          })
          .catch(function () {
            renderEducation();
          });
      }

      function saveAbout() {
        var payload = getPayload();

        if (!validateRequired(payload)) {
          showToast("Please fill all required fields.", true);
          return;
        }

        var method = "put";
        var url = BASE_URL + "about";

        $http({
          method: method,
          url: url,
          data: payload,
          headers: authHeaders()
        })
          .then(function (response) {
            if (response.data && response.data._id) {
              aboutId = response.data._id;
            }
            showToast("About section updated successfully.");
            updateLastUpdated();
          })
          .catch(function () {
            $http
              .post(BASE_URL + "about", payload, { headers: authHeaders() })
              .then(function (response) {
                if (response.data && response.data._id) {
                  aboutId = response.data._id;
                }
                showToast("About section created successfully.");
                updateLastUpdated();
              })
              .catch(function () {
                showToast("Failed to save About section.", true);
              });
          });
      }

      function bindEvents() {
        var saveBtn = byId("saveBtn");
        var previewBtn = byId("preview-btn");
        var textArea = byId("aboutDescription");
        var addEducationBtn = byId("addEducationBtn");
        var modalSaveBtn = byId("modalSaveBtn");
        var educationList = byId("educationList");
        var modal = byId("educationModal");
        var imageInput = byId("imageInput");
        var removeImageBtn = byId("removeImageBtn");
        var resumeInput = byId("resumeInput");
        var downloadResumeBtn = byId("downloadResumeBtn");

        if (saveBtn) saveBtn.addEventListener("click", saveAbout);
        if (previewBtn) {
          previewBtn.addEventListener("click", function () {
            window.open("/", "_blank");
          });
        }
        if (textArea) textArea.addEventListener("input", updateCharCount);

        if (addEducationBtn) {
          addEducationBtn.addEventListener("click", function () {
            openEducationModal();
          });
        }

        if (modalSaveBtn) {
          modalSaveBtn.addEventListener("click", function () {
            var title = byId("modalTitle_input").value.trim();
            var duration = byId("modalDuration").value.trim();
            var location = byId("modalLocation").value.trim();
            var percentage = byId("modalPercentage").value.trim();

            if (!title) {
              showToast("Education title is required.", true);
              return;
            }

            var item = {
              title: title,
              duration: duration,
              location: location,
              percentage: percentage
            };

            if (editEducationIndex !== null) {
              educationItems[editEducationIndex] = item;
            } else {
              educationItems.push(item);
            }

            renderEducation();
            closeEducationModal();
          });
        }

        if (educationList) {
          educationList.addEventListener("click", function (event) {
            var editIndex = event.target.getAttribute("data-edit-index");
            var deleteIndex = event.target.getAttribute("data-delete-index");

            if (editIndex !== null) {
              openEducationModal(Number(editIndex));
              return;
            }

            if (deleteIndex !== null) {
              educationItems.splice(Number(deleteIndex), 1);
              renderEducation();
            }
          });
        }

        if (modal) {
          modal.addEventListener("click", function (event) {
            if (event.target.id === "educationModal") {
              closeEducationModal();
            }
          });
        }

        if (imageInput) {
          imageInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            if (!file) return;

            var reader = new FileReader();
            reader.onload = function (e) {
              currentProfilePhoto = e.target.result;
              setImagePreview(currentProfilePhoto);
            };
            reader.readAsDataURL(file);
          });
        }

        if (removeImageBtn) {
          removeImageBtn.addEventListener("click", function () {
            currentProfilePhoto = "";
            if (imageInput) {
              imageInput.value = "";
            }
            setImagePreview("");
          });
        }

        if (resumeInput) {
          resumeInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            if (!file) return;
            currentResume = file.name;
            byId("resumeFileName").textContent = file.name;
            if (downloadResumeBtn) {
              downloadResumeBtn.style.display = "inline-block";
            }
          });
        }

        if (downloadResumeBtn) {
          downloadResumeBtn.addEventListener("click", function () {
            if (currentResume) {
              window.open(currentResume, "_blank");
            }
          });
        }

        window.closeEducationModal = closeEducationModal;
      }

      $timeout(function () {
        bindEvents();
        loadAbout();
      }, 0);
    },
  };
});
